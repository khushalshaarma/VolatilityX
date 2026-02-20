"""A small rule parser that can evaluate rules of the form:
IF <cond> AND <cond> THEN BUY
Conditions support simple comparisons against named variables, e.g. RSI < 30
"""
import operator
from typing import Callable, Dict

OPS = {"<": operator.lt, ">": operator.gt, "<=": operator.le, ">=": operator.ge, "==": operator.eq}


def parse_condition(cond_str: str) -> Callable[[Dict], bool]:
    # e.g. "RSI < 30"
    parts = cond_str.strip().split()
    if len(parts) != 3:
        raise ValueError("Invalid condition")
    left, op, right = parts
    if op not in OPS:
        raise ValueError("Unsupported op")

    def f(ctx: Dict):
        val = ctx.get(left.lower())
        if val is None:
            return False
        try:
            rval = float(right)
        except Exception:
            rval = float(ctx.get(right.lower(), 0))
        return OPS[op](val, rval)

    return f


def parse_rule(rule: str) -> Callable[[Dict], int]:
    # supports single THEN BUY/SELL and AND chaining
    rule = rule.strip()
    if not rule.upper().startswith("IF"):
        raise ValueError("Rule must start with IF")
    if "THEN" not in rule.upper():
        raise ValueError("Rule missing THEN")
    left, right = rule.upper().split("THEN", 1)
    conds = left[2:].strip().split("AND")
    cond_funcs = [parse_condition(c.strip()) for c in conds]
    action = right.strip()

    def signal(ctx: Dict) -> int:
        ok = all(cf(ctx) for cf in cond_funcs)
        if not ok:
            return 0
        if action == "BUY":
            return 1
        if action == "SELL":
            return -1
        return 0

    return signal

from Crypto.Util.number import *

flag = """flag{this_is_not_the_real_flag}""".encode()
flag = bytes_to_long(flag)
a = 1345212
b = 123456
c = 13378

def encrypt(flag):
    ans = flag**2*a+flag*b+13378
    return ans


print(encrypt(flag))


#output : 3490328340008690417192919402858774239416785410206461050515711869757144570385922872006293424689901129597446089632118562258594119016482465727928300115309446732438463963212587494176790046 


#hint : z3-solver can solve math question
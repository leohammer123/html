import math
import hashlib
def isprime(k):
    if k==2 or k==3: return True
    if k%2==0 or k<2: return False
    for i in range(3, int(k**0.5)+1, 2):
        if k%i==0:
            return False

    return True

i = True

def sum(n):
    s = 0
    for i in str(n):
        s += int(i)
    return s
    
while(i):
    try:
        k = int(input())
    except ValueError :
        print("Not a pincode")
        continue
    
    if (isprime(k)):
        if(len(str(k))==5):
            if(isprime(k+18) and isprime(k+36) and isprime(k+72)):
                if(sum(k)==17):
                    if((k+1)%37==0):
                        print("Correct pincode")
                        exit(0)
    
    print("Not correct")

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

while(i):
    try:
        k = int(input())
    except ValueError :
        print("Not a pincode")
        continue
    
    if (isprime(k)):
        if(int(math.log(k))>=4):
            if(k%10==1):
                if(hashlib.md5(str(k).encode()).hexdigest()=="0b43a4a4f569aaee9e3e094c770fb9b1"):
                    print("Correct pincode")
                    exit(0)
    
    print("Not correct")
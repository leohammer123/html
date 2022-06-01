from itertools import tee, zip_longest
import random

f = open("random.txt","r").read()
flag = "flag{r3gular_express1on_1s_p0w3rfu1_and_usefu1_uwu_just_make_the_flag_longer}"

randomset = []

for i in range(len(flag)+1):
    
    k = random.randint(0,len(f))
    
    if k not in randomset:
        randomset.append(k)

    else:
        i-=1
    

start, end = tee(randomset)
next(end)
split_text = [f[i:j] for i,j in zip_longest(start, end)]
text = ""
for i,j in enumerate(split_text):
    
    sentence = "flag{" + str(random.randint(1,9)) + flag[i] + "}"
    
    text += sentence+j

open("s.txt","w").write(text)
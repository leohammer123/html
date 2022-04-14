
import random
print("Welcome to the land of hidden wonders, secrets, and surprises!")
print("No one can tell what may happen in this land, with infinite many places to explore.")
print("Legend tells of a secret place, where a great treasure lies.")
print("Many have searched and attempted to find this great treasure, but to no avail.")
print("Now you have the chance, to go on this quest, will you succeed?\n")
while True:
   print("Where would you like to go?")
   print("------------------------------------")
   print("1 - Forwards")
   print("2 - To the right")
   print("3 - To the left")
   print("4 - Backwards")
   print("5 - Upwards???")
   print("6 - Downwards???")
   choice = input("=> ")
   print("\n")
   places = ["Dwarven Mines", "Elf Forest", "Pleasant Pasture", "Moo Moo Meadow", "Slugy Swamp", "Molten Mountain", "Shadowy Shrubs", "Castle of Doom", "Floating Fruit Trees", "Trashy Trove", "Dark Tower", "Fairy Kingdom", "Giant's Lair", "Magnificent Marsh", "Outer Islands", "Frozen Tree", "Dragon's Cave", "Tall Harbor", "Speedy Port"]
   if 0 < choice < 7:
      pass
   else:
      print("You try to go to a non-existent place and somehow end up dying in a black hole.")
   if choice == 1:
      print("You go forwards and arrive at the "+places[random.randint(0, 18)])
      print("You take a look around, but find nothing that might bring you closer to your treasure.")
      print("You decide to continue on your search for the treasure.\n")
   if choice == 2:
      print("You go to the right and arrive at the "+places[random.randint(0, 18)])
      print("You take a look around, but find nothing that might bring you closer to your treasure.")
      print("You decide to continue on your search for the treasure.\n")
   if choice == 3:
      print("You go to the left and arrive at the "+places[random.randint(0, 18)])
      print("You take a look around, but find nothing that might bring you closer to your treasure.")
      print("You decide to continue on your search for the treasure.\n")
   if choice == 4:
      print("You go backwards and arrive at the "+places[random.randint(0, 18)])
      print("You take a look around, but find nothing that might bring you closer to your treasure.")
      print("You decide to continue on your search for the treasure.\n")
   if choice == 5:
      if random.randint(1, 2) == 1:
         print("You attempt to go upwards but end up going nowhere :(\n")
      else:
         print("Somehow, you manage to get 10 meters off the ground, but then fall back down, crack your skull, and die\n")
         break
   if choice == 6:
      if random.randint(1, 2) == 1:
         print("You somehow manage to find a shovel, and start digging down.")
         print("Then you manage to find... Absolutely nothing :(\n")
      else:
         print("Attempt to try to dig into the ground with your hands, but end up getting nowhere, and dying of boredom.\n")


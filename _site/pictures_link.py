import os, sys

pictures = [('[![' + picture + '](../uploads/pictures/' + picture + 
			'){: height="100" }](../uploads/pictures/' + picture + 
			')\n') for picture in os.listdir("./uploads/pictures/")]

with open("pictures_list.txt", "w") as text_file:
    [text_file.write(picture) for picture in pictures]

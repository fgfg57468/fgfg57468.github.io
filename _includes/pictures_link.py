import os, sys

pictures = [('<img src=' + '"../uploads/pictures/' + picture + '">\n') 
			for picture in os.listdir("../uploads/pictures/")]

with open("gallery_files.html", "w") as text_file:
    [text_file.write(picture) for picture in pictures]

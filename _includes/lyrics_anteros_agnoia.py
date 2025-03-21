import os, sys
import string

page_header = """
---
layout: page
title: стихи | anterosΛagnoia
permalink: /lyrics/anteros&agnoia
---
"""

#os.chdir("../uploads/lyrics_anteros_agnoia")

text_files = [f.split(".md")[0]+"\n\n" + open("../uploads/lyrics_anteros_agnoia/"+f, encoding="utf-8", mode="r").read() for f in os.listdir("../uploads/lyrics_anteros_agnoia")]
#text_files = [text.split(text[text.find("[["):text.rfind("]]")]+"]]")[0] for text in text_files]

text_files.insert(0, page_header)


with open("../lyrics_anteros_agnoia.md", encoding="utf-8", mode="w") as text_file: 
	#[print(text[text.find("[["):text.rfind("]]")+2]) for text in text_files]
	[text_file.write("\n\n"+text) for text in text_files]

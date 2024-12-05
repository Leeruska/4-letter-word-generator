import csv
import os

#This script will:
#Create the "lists" folder if it doesn't already exist.
#Write each list of words to a separate text file in the "lists" folder, with each word on a new line.


# Define the path to the CSV file
csv_file_path = os.path.join('..', 'data', 'muokattu-nykysuomensanalista2024.csv')

# Define the path to the lists folder
lists_folder_path = os.path.join('..', 'lists')

# Create the lists folder if it doesn't exist
os.makedirs(lists_folder_path, exist_ok=True)

# Initialize dictionaries to store words by their parts of speech
words_by_pos = {
    'substantiivi': [],
    'adjektiivi': [],
    'adverbi': [],
    'verbi': [],
    'interjektio': []
}

# Read and parse the CSV file
with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        word = row['Hakusana']
        pos = row['Sanaluokka']
        if pos in words_by_pos:
            words_by_pos[pos].append(word)

# Write the separated words to files in the lists folder
for pos, words in words_by_pos.items():
    file_path = os.path.join(lists_folder_path, f"{pos}.txt")
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write('\n'.join(words))

print("Words have been written to the lists folder.")
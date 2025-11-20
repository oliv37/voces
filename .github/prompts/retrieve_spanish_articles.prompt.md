# Retrieve spanish articles

The goal is to retrieve 3 articles from https://www.infobae.com/america/
extract their content and save it into txt files

## Steps

- Go to https://www.infobae.com/america/
- Select 3 trending articles
- Go to the article webpage and extract the article content
- For each article, create a txt file into `src/data/texts` directory, put the article content in it

## Instructions

- Only retrieve the article title and the article paragraphs
- Do not retrieve article images, links, only the content of the article should be fetched
- For the txt file name, choose a brief summary of the article, the name should be at most five words separated by underscore and ending with .txt extension, for example ellecciones_legislativas_argentina.txt

The txt file format should be the following :

- The first line is the article title followed by a blank line
- After that each paragraph should be separated by a blank line
- each line (except for the first line, the article title should be a single line) of the file should not be too long, maximum 15 words per line, add carriage return to prevent very large line

Finally, update the `TEXT_IDS` array in `src/app/text/datas/text-data.ts` file to add the new articles ids (the txt file names without the .txt extension) at the beginning of the array.

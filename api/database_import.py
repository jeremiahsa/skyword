import csv
from api_library.models import Book

i = 0

with open('database_initial.txt') as f:
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        if i == 0:
            i += 1
            continue
        #row = trow[0].split('\t')
        print(row)
        _, created = Book.objects.get_or_create(
            title=row[0],
            author=row[1],
            recommender=row[2],
            source=row[3],
            amazon_link=row[4],
            description=row[5],
            book_type=row[6],
            genre=row[7],
            length = 0 if row[8] == '' else int(row[8]),
            publish_year = 0 if row[9] == '' else int(row[9]),
            on_list=row[10],
            review_excerpt=row[11],
        )
        if not created:
            print('Skipping row')
            print(row)
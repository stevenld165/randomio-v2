# Use Case: Add to Show List

## ID: 2

## Brief Description:

When rerolling, Randomio will pick a random episode from a list of shows that the user creates. This describes the process of adding a new show to the list.

## Primary Actors

- User

## Secondary Actors

- name-to-imdb
- Cinemeta

## Preconditions

- User is logged in
- User is on the page for editing their show list

## Main Flow

1. User clicks on "Add show" button
2. The frontend will show a prompt to search for the desired show
3. The user will input the title of the show along with year if desired
4. The system will query name-to-imdb to search for the IMDB ID of the show
5. The system will use the found IMDB ID to query the Cinemeta API for the show's metadata
6. The frontend will display the found show and will ask the user if it is correct
7. If the user confirms:
   1. The system will add the show to the database if it does not exist, or update the existing show entry if exists
   2. The system will add the show to the user's show list
   3. The frontend will display the user's show list with the show added
   4. Include(Edit show filters)
8. Else, go back to Step 2.

## Postconditions

- Show is either added or updated in the database
- Show is added to user's show list

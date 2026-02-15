# Use Case: Roll New Episode

## ID: 1

## Brief Description:

This is the main use case of Randomio. The user clicks on the Roll button, and the system fetches a random episode from the user's show list. The user can then click the play button which will take the user straight to the episode in Stremio.

## Primary Actors

- User

## Secondary Actors

- Cinemeta

## Preconditions

- User is logged in
- User is on the main Randomio page
- User's show list is not empty

## Main Flow

1. The user clicks on the Roll button
2. The system will fetch the list of shows that are enabled from the user's show list
3. The system will randomly select one of the shows
4. The system will fetch the metadata of the randomly selected show
5. The system will obtain the list of all episodes from the metadata
6. The system will filter the list of episodes based on the users season selection and/or special episodes
7. The system will select a random episode from the filtered list
8. The system will create the Stremio link based on the episode's Stremio id
9. The frontend will store the episode information to a stack history of previously rolled episodes
10. The frontend will display the random episode's information
11. If the user presses the "Go back" button
    1. The frontend will retrieve the previously rolled episode
12. Repeat until the user

## Postconditions

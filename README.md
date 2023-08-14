# Music App
## Description

This is a music app built on React Native that connects indivudals together based on their proximity to each other as well as how close their music interests are. The app uses ```react-native-maps``` combined with web sockets to display users nearby. Users are stored on a PostgreSQL database. User music data is taken from the Spoitfy API. 

## Implementation Details

User recommendations are derived via a graph of other users that the current user is connected to. A weighted graph of secondary connections based on their proximity to the current user as well as a numerical representation of their similarity in music taste is generated through bfs of the user's current connections and the largest resulting weights are chosen to be recommended connections. 




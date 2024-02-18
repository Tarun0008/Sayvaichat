<?php
// Get the selected radio station from the query parameters
$selectedStation = $_GET['station'];

// Define the streaming URLs for each station
$streamingUrls = [
    'hello' => 'https://strw1.openstream.co/1313?aw_0_1st.collectionid%3D4428%26stationId%3D4428%26publisherId%3D1337%26k%3D1692506589',
    'big' => 'https://stream-162.zeno.fm/r2gn1pgm4qruv?zs=pOc0_V1hTj22jcdjeHAG0w',
    'thendral' => 'https://stream-160.zeno.fm/xzt706p3h2zuv?zs=E5lJpR4zTFOtKLwUEcrGRg',
    'mirchi' => 'https://stream-160.zeno.fm/3dktvcp0bg0uv?zs=Xbq-PGVpRFenHkCZNrcTog'
];

// Check if the selected station exists in the streaming URLs array
if (array_key_exists($selectedStation, $streamingUrls)) {
    // Redirect the user to the appropriate streaming URL
    header("Location: " . $streamingUrls[$selectedStation]);
    exit();
} else {
    // Handle invalid station selection
    echo "Invalid radio station.";
}
?>

export function incrementWaypointName(waypointName) {
  // Use regex to match the number in the string (assuming the number is at the end of the string)
  const match = waypointName.match(/\d+/);

  if (match) {
    // Convert the matched number to an integer
    const number = parseInt(match[0], 10);

    // Increment the number
    const incrementedNumber = number + 1;

    // Replace the old number in the string with the new incremented number
    return waypointName.replace(number, incrementedNumber);
  }

  // If no number is found, return the original string
  return waypointName;
}

export function getColor(vote) {
    if (vote >= 7) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
  }
export function formatDate(date) {
    // Format date to YYYY-MM-DD for API compatibility
    return date.toISOString().split('T')[0];
  }
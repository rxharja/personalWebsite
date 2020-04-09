const getPage = (history) => {

  const getTitle = (location) => {
    if ( location.length > 1) {
      return location[1].toUpperCase() + location.slice(2);
    } else {
      return location.slice(1);
    }
  }

  const switchSubtitle = (title) => {
    switch (title) {
      case '/articles':
        return "Latest Musings";
      case '/login':
        return "Going to post something cool?"
      default:
        return "Copacetic";
    }
  }
  const title = getTitle(history.location.pathname)
  return {"title": title, "sub": switchSubtitle(history.location.pathname)}
}

export default getPage;

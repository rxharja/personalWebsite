const getPage = (history) => {

  const getTitle = (location) => {
    if ( location.length > 1) {
      return location[1].toUpperCase() + location.slice(2);
    } else {
      return location.slice(1);
    }
  }

  const switchSubtitle = (title) => {
    console.log(title)
    switch (title) {
      case '/articles/':
        return "🖥️🧬Selcouth Solutions";
      case '/login/':
        return "👌Sign in to Post something cool"
      case '/signup/':
        return "👏Welcome to the family"
      default:
        return "🤙Copacetic";
    }
  }
  const title = getTitle(history.location.pathname)
  return {"title": title, "sub": switchSubtitle(history.location.pathname)}
}

export default getPage;

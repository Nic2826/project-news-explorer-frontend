import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Header from "../Header/Header";

export default function SavedNews({
  articles,
  onDeleteArticle,
  keyword,
  onUpdateArticles,
  onSaveArticle,
  username,
  isRouteSavedArticles,
  handleLoginClick
}) {


  return (
    <div className="saved-news-container">

      <Header
        isLogged={true}
        name={username || 'Nic'}
        isRouteSavedArticles={isRouteSavedArticles} 
        handleLogin={handleLoginClick}
      />

      <SavedNewsHeader
        articles={articles}
        username={username}
      />

      <NewsCardList
        articles={articles}
        isLogged={true}
        onSaveArticle={onSaveArticle}
        onDeleteArticle={onDeleteArticle}
        keyword={keyword}
        onUpdateArticles={onUpdateArticles}
        
      />
    </div>
  )
}
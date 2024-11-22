import { useSelector } from 'react-redux'

export function useArticle() {
  const { title, description, body, tags, errorMessage, isSave, isCreated, favorited, favoritesCount } = useSelector(
    (state) => state.article
  )
  console.log(favoritesCount)
  return {
    titleDefault: title,
    description: description,
    body: body,
    tags: tags,
    errorMessage: errorMessage,
    isSave: isSave,
    isCreated: isCreated,
    favorited: favorited,
    favoritesCount: favoritesCount,
  }
}

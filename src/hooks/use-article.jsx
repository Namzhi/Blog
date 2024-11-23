import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export function useArticle() {
  const articleState = useSelector((state) => state.article)

  return useMemo(
    () => ({
      titleDefault: articleState.title,
      description: articleState.description,
      body: articleState.body,
      tags: articleState.tags,
      errorMessage: articleState.errorMessage,
      isSave: articleState.isSave,
      isCreated: articleState.isCreated,
      favorited: articleState.favorited,
      favoritesCount: articleState.favoritesCount,
      isLoading: articleState.loading,
      error: articleState.error,
      articlesCount: articleState.articlesCount,
    }),
    [articleState]
  )
}

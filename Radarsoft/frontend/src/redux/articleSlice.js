import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance, { API_BASE_URL } from '../api/axiosConfig'

// Async Thunks
export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async (params, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(params).toString()
            const response = await axiosInstance.get(`/articles?${queryString}`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles')
        }
    }
)

export const fetchArticleById = createAsyncThunk(
    'articles/fetchArticleById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/articles/${id}`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch article')
        }
    }
)

export const createArticle = createAsyncThunk(
    'articles/createArticle',
    async (articleData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/articles`, articleData)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create article')
        }
    }
)

export const updateArticle = createAsyncThunk(
    'articles/updateArticle',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/articles/${id}`, data)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update article')
        }
    }
)

export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/articles/${id}`)
            return id
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete article')
        }
    }
)

const initialState = {
    articles: [],
    currentArticle: null,
    loading: false,
    error: null,
    successMessage: null
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null
        },
        resetCurrentArticle: (state) => {
            state.currentArticle = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Articles
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false
                state.articles = action.payload
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch Article By ID
            .addCase(fetchArticleById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.loading = false
                state.currentArticle = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Create Article
            .addCase(createArticle.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.loading = false
                state.articles.push(action.payload)
                state.successMessage = 'Article created successfully'
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Update Article
            .addCase(updateArticle.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.loading = false
                const index = state.articles.findIndex(article => article._id === action.payload._id)
                if (index !== -1) {
                    state.articles[index] = action.payload
                }
                state.currentArticle = action.payload
                state.successMessage = 'Article updated successfully'
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Delete Article
            .addCase(deleteArticle.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.loading = false
                state.articles = state.articles.filter(article => article._id !== action.payload)
                state.successMessage = 'Article deleted successfully'
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { clearError, clearSuccessMessage, resetCurrentArticle } = articleSlice.actions
export default articleSlice.reducer

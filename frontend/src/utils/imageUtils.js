// Helper function to construct full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  return `${baseURL}${imagePath}`
}

// Helper function to get the first image from an array of image URLs
export const getFirstImage = (imageUrls) => {
  if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
    return null
  }
  return getImageUrl(imageUrls[0])
}

// Helper function to get all images with full URLs
export const getAllImages = (imageUrls) => {
  if (!imageUrls || !Array.isArray(imageUrls)) {
    return []
  }
  return imageUrls.map(url => getImageUrl(url)).filter(Boolean)
}

// Helper function to handle image loading errors
export const handleImageError = (event) => {
  // Replace broken image with a placeholder
  event.target.style.display = 'none'
  const placeholder = document.createElement('div')
  placeholder.className = 'w-full h-full flex items-center justify-center bg-earth-100'
  placeholder.innerHTML = `
    <svg class="w-12 h-12 text-earth-300" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
    </svg>
  `
  event.target.parentNode.appendChild(placeholder)
} 
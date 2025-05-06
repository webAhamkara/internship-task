export default async function handler(req, res) {
  const { dish } = req.query

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${dish}&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_API_KEY}`,
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

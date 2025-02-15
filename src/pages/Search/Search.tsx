import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Card, CardContent, TextField, Button, Typography, Box } from "@mui/material"
import styles from "./Search.module.css"

export default function SearchPage() {
  const [searchId, setSearchId] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchId.trim()) {
      navigate(`/shopping-list/${searchId.trim()}`)
    }
  }

  return (
    <Container className={styles.container} maxWidth={false}>
      <Box className={styles.logoContainer}>Logo Placeholder</Box>
      <Box className={styles.centerContainer}>
        <Card className={styles.card}>
          <CardContent className={styles.content}>
            <Typography variant="h5" className={styles.title}>
              Search for a Shopping List
            </Typography>
            <TextField
              label="Enter Shopping List ID"
              variant="outlined"
              fullWidth
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className={styles.input}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} className={styles.button}>
              Search
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

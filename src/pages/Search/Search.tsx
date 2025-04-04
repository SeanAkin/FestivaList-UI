import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {Container, CardContent, TextField, Button, Typography, Box, InputAdornment} from "@mui/material"
import {Search as SearchIcon} from "@mui/icons-material"
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
            <Box className={styles.logoContainer}>
                <img src="/festivalist-no-bg.png" alt="FestivaList Logo"/>
            </Box>
            <Box className={styles.centerContainer}>
                <CardContent className={styles.content}>
                    <Typography variant="h5" className={styles.title}>
                        Search for a Shopping List
                    </Typography>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            label="Enter Shopping List ID"
                            variant="outlined"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch()
                                }
                            }}
                            className={styles.input}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#E38800' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.12)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#E38800',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#E38800',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#E38800',
                                },
                                maxWidth: '500px',
                                width: '100%',
                            }}
                        />
                    </Box>
                    <Button 
                        variant="contained" 
                        onClick={handleSearch} 
                        className={styles.button}
                        disableElevation
                    >
                        Search
                    </Button>
                </CardContent>
            </Box>
        </Container>
    )
}

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";

const Recipe = (params) => {
    const { recipe } = params;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={recipe.title} titleTypographyProps={{variant: "h6"}} subheader={new Date(recipe.updated_at).toLocaleString("en-AU")} subheaderTypographyProps={{variant: "overline"}} />
            <CardMedia component="img" image={recipe.image_url} alt={recipe.title} height="140" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {recipe.author.username}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/recipes/${recipe.id}`} size="small">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default Recipe;

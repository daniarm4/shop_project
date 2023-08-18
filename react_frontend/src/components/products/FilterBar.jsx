import { 
    Box, 
    Button, 
    Checkbox, 
    FormControl, 
    FormControlLabel, 
    InputLabel, 
    MenuItem, 
    Select 
} 
from '@mui/material';

const FilterBar = ({categories, tags, filters, setFilters, setCurrentPage}) => {
    const sortParams = [
        {label: 'Price', value: 'price'},
        {label: 'Price descending', value: '-price'},
    ]

    const handleSortParamChange = (sortParam) => {
        setFilters(prev => ({...prev, sortParam}));
    }

    const handleTagClick = (tag) => {   
        setCurrentPage(1)
        setFilters(prev => {
            const chosenTags = prev.tags.includes(tag) 
            ? prev.tags.filter(t => t !== tag)
            : [...prev.tags, tag];

            return {...prev, tags: chosenTags};
        })
    }

    const handleCategoryChange = (category) => {
        setCurrentPage(1)
        setFilters(prev => ({...prev, category}));
    }

    return (
        <Box p={1} display='flex' mr={1}>
            <Box 
                display={{ xs: 'column', md: 'grid' }}
                gridTemplateColumns={{ md: 'repeat(3, 1fr)' }} 
            >
                {tags.map(tag => (
                    <Box mr={1} mb={1}>
                        <Button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            variant={filters.tags.includes(tag) ? 'contained' : 'outlined'}
                            color={filters.tags.includes(tag) ? 'secondary' : 'primary'}
                            sx={{ 
                                padding: '2px 6px',
                                fontSize: '12px' 
                            }}
                        >
                            {tag}
                        </Button>
                    </Box>
                ))}
            </Box>
            <Box display={{ xs: 'column', md: 'grid' }} alignItems="center" gridTemplateColumns="repeat(3, 1fr)">
                <FormControl fullWidth size="small" sx={{mx: 1, minWidth: 200}}>
                    <InputLabel id="category-label">Select category</InputLabel>
                    <Select
                        labelId="category-label"
                        value={filters.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        label="Select category"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel 
                    control={<Checkbox checked={filters.inStock} 
                    onChange={e => setFilters(prev => ({...prev, inStock: e.target.checked}))} />} 
                    label='Active product' 
                    sx={{mx: 1, ml: 4}}
                />
                <FormControl fullWidth size="small">
                <InputLabel id="sort-label">Select sort param</InputLabel>
                <Select
                    labelId="sort-label"
                    value={filters.sortParam}
                    onChange={(e) => handleSortParamChange(e.target.value)}
                    label="Select sort param"
                >
                    <MenuItem value="">
                        <em>Default</em>
                    </MenuItem>
                    {sortParams.map(param => (
                    <MenuItem key={param.label} value={param.value}>
                        {param.label}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default FilterBar;

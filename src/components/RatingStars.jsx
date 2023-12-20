const RatingStars = ({ rating }) => {
    const renderStars = () => {
        const filledStars = [];
        const maxStars = 5;

        for (let i = 1; i <= maxStars; i++) {
            filledStars.push(
                <span key={i} style={{ color: 'gold', fontSize: '1.2rem' }}>
                    {i <= rating ? '\u2605' : '\u2606'}
                </span>
            );
        }

        return filledStars;
    };
    return renderStars();
};


export default RatingStars;
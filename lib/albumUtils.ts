/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Helper function to load an image and return it as an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        // Setting crossOrigin is good practice for canvas operations, even with data URLs
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Failed to load image: ${src.substring(0, 50)}...`));
        img.src = src;
    });
}

/**
 * Creates a single "photo album" page image from a collection of styled images.
 * @param imageData A record mapping style strings to their image data URLs.
 * @returns A promise that resolves to a data URL of the generated album page (JPEG format).
 */
export async function createAlbumPage(imageData: Record<string, string>): Promise<string> {
    const canvas = document.createElement('canvas');
    // High-resolution canvas for good quality (A4-like ratio)
    const canvasWidth = 2480;
    const canvasHeight = 3508;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D canvas context');
    }

    // 1. Draw the album page background
    ctx.fillStyle = '#FFFFFF'; // A clean white background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Draw the title
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';

    ctx.font = `bold 120px 'Poppins', sans-serif`;
    ctx.fillText('Your Perfect Shots', canvasWidth / 2, 180);

    ctx.font = `50px 'Poppins', sans-serif`;
    ctx.fillStyle = '#555';
    ctx.fillText('Generated with Perfect Shot AI on Google AI Studio', canvasWidth / 2, 260);

    // 3. Load all the images concurrently
    const styles = Object.keys(imageData);
    const loadedImages = await Promise.all(
        Object.values(imageData).map(url => loadImage(url))
    );

    const imagesWithStyles = styles.map((style, index) => ({
        style,
        img: loadedImages[index],
    }));

    // 4. Define grid layout and draw each photo
    const grid = { cols: 2, rows: 3, padding: 100 };
    const contentTopMargin = 350; // Space for the header
    const contentHeight = canvasHeight - contentTopMargin;
    const cellWidth = (canvasWidth - grid.padding * (grid.cols + 1)) / grid.cols;
    const cellHeight = (contentHeight - grid.padding * (grid.rows + 1)) / grid.rows;

    const photoCardAspectRatio = 1.33; // 4:3 vertical
    const maxPhotoWidth = cellWidth * 0.9;
    const maxPhotoHeight = cellHeight * 0.9;

    let photoWidth = maxPhotoWidth;
    let photoHeight = photoWidth * photoCardAspectRatio;

    if (photoHeight > maxPhotoHeight) {
        photoHeight = maxPhotoHeight;
        photoWidth = photoHeight / photoCardAspectRatio;
    }

    const imageContainerWidth = photoWidth - 40; // Padding inside the card
    const imageContainerHeight = photoHeight - 120; // Space for text at bottom

    imagesWithStyles.forEach(({ style, img }, index) => {
        const row = Math.floor(index / grid.cols);
        const col = index % grid.cols;

        const x = grid.padding * (col + 1) + cellWidth * col + (cellWidth - photoWidth) / 2;
        const y = contentTopMargin + grid.padding * (row + 1) + cellHeight * row + (cellHeight - photoHeight) / 2;
        
        ctx.save();
        
        ctx.translate(x + photoWidth / 2, y + photoHeight / 2);
        
        const rotation = (Math.random() - 0.5) * 0.05; // Radians (approx. +/- 1.5 degrees)
        ctx.rotate(rotation);
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;
        
        // Draw the white photo card frame
        ctx.fillStyle = '#fff';
        ctx.fillRect(-photoWidth / 2, -photoHeight / 2, photoWidth, photoHeight);
        
        ctx.shadowColor = 'transparent';

        // Draw the image itself
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        let drawWidth = imageContainerWidth;
        let drawHeight = drawWidth / aspectRatio;

        if (drawHeight > imageContainerHeight) {
            drawHeight = imageContainerHeight;
            drawWidth = drawHeight * aspectRatio;
        }

        const imgX = -drawWidth / 2;
        const imgY = -photoHeight / 2 + 20 + (imageContainerHeight - drawHeight) / 2;
        
        ctx.drawImage(img, imgX, imgY, drawWidth, drawHeight);
        
        // Draw the caption
        ctx.fillStyle = '#333';
        ctx.font = `60px 'Poppins', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const captionY = photoHeight / 2 - 60;
        ctx.fillText(style, 0, captionY);
        
        ctx.restore();
    });

    // Convert canvas to a high-quality JPEG and return the data URL
    return canvas.toDataURL('image/jpeg', 0.9);
}
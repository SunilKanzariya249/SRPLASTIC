const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config({ path: path.join(__dirname, '.env') });

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/srplastic';

// Heuristics for categories
function getCategoryInfo(pageNum) {
  if (pageNum === 1 || pageNum === 86) return null; // Intro page or machinery list (not a product)
  if (pageNum >= 2 && pageNum <= 29) {
    return { category: 'PVC Mould', subcategory: pageNum >= 21 ? 'Tiles' : 'Paver Moulds' };
  }
  if (pageNum >= 30 && pageNum <= 74) {
    return { category: 'Rubber Mould', subcategory: 'Rubber Moulds' };
  }
  if (pageNum >= 75 && pageNum <= 77) {
    return { category: 'Rubber Mould', subcategory: 'Wall Claddings' };
  }
  if (pageNum >= 78 && pageNum <= 85) {
    return { category: 'Cover Block', subcategory: pageNum >= 81 ? 'Round Cover Blocks' : 'Square Cover Blocks' };
  }
  if (pageNum >= 86 && pageNum <= 91) {
    return { category: 'Machinery', subcategory: 'Production Machinery' };
  }
  if (pageNum === 92) {
    return { category: 'Color', subcategory: 'Colors' };
  }
  if (pageNum === 93 || pageNum === 95) {
    return { category: 'Chemicals & Hardener', subcategory: 'Additives & Polish' };
  }
  if (pageNum === 94) {
    return { category: 'Plastic Sheet', subcategory: 'Sheets' };
  }
  return { category: 'PVC Mould', subcategory: 'Other' };
}

// Clean and capitalize titles
function cleanTitle(titleText) {
  if (!titleText) return 'Unknown Product';
  return titleText
    .split(/[\n\r]+/)
    .map(line => line.trim())
    .filter(line => line.length > 0 && !/^\d+$/.test(line))
    .slice(0, 2)
    .join(' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(mongoURI);
    console.log('Connected to Database.');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Read product images directory to match names
    const imagesDir = path.join(__dirname, '../product_images');
    let imageFiles = [];
    if (fs.existsSync(imagesDir)) {
      imageFiles = fs.readdirSync(imagesDir);
    } else {
      console.warn('Warning: product_images folder not found at', imagesDir);
    }

    // Read extracted text
    const textPath = path.join(__dirname, '../extracted_text.md');
    if (!fs.existsSync(textPath)) {
      throw new Error(`extracted_text.md not found at ${textPath}`);
    }

    const textContent = fs.readFileSync(textPath, 'utf8');
    // Split by page marker
    const pages = textContent.split(/## \-\-\- Page /g);

    const productsToInsert = [];

    for (const page of pages) {
      if (!page.trim()) continue;

      const lines = page.split('\n').map(l => l.trim()).filter(Boolean);
      const headerLine = lines[0]; // e.g. "2 ---" or "87 ---"
      const pageNumMatch = headerLine.match(/^(\d+)/);
      if (!pageNumMatch) continue;

      const pageNum = parseInt(pageNumMatch[1], 10);
      const catInfo = getCategoryInfo(pageNum);
      if (!catInfo) continue; // Skip page 1 or unmapped pages

      // Remaining lines for name & specs
      const pageLines = lines.slice(1);
      
      // Determine Title
      const titleLines = [];
      const specLines = [];
      
      const specKeywords = [
        'capacity', 'vibration', 'power require', 'weight', 'surface', 
        'plate thickness', 'table size', 'electric motar', 'phase type', 
        'voltage', 'bottom plate size', 'speciality', 'power source', 
        'type of drum', 'material', 'portable', 'sheet size', 'thickness'
      ];

      let specsStarted = false;
      for (const line of pageLines) {
        const lowerLine = line.toLowerCase();
        // Check if line represents a specification key
        const isSpec = specKeywords.some(keyword => lowerLine.includes(keyword) || lowerLine.startsWith('mixing') || lowerLine.startsWith('usage'));
        if (isSpec || lowerLine.includes('require for') || lowerLine.includes('details')) {
          specsStarted = true;
        }

        if (specsStarted) {
          specLines.push(line);
        } else {
          titleLines.push(line);
        }
      }

      const name = cleanTitle(titleLines.join('\n'));

      // Parse specifications into key-value pairs
      let specifications = {};
      
      // Load from clean_parsed_specs.json if within page 2 to 85
      if (pageNum >= 2 && pageNum <= 85) {
        try {
          const ocrSpecsPath = path.join(__dirname, '../clean_parsed_specs.json');
          if (fs.existsSync(ocrSpecsPath)) {
            const ocrData = JSON.parse(fs.readFileSync(ocrSpecsPath, 'utf8'));
            if (ocrData[pageNum]) {
              specifications = ocrData[pageNum];
            }
          }
        } catch (err) {
          console.warn(`Warning loading OCR specs for page ${pageNum}:`, err);
        }
        
        // Manual overrides for pages 74-77
        const manualSpecs = {
          74: {"Size": "10 inch x 10 inch", "Material": "Heavy-Duty Polyurethane Rubber", "Usage/Application": "Casting Designer Wall Tiles"},
          75: {"Size": "6 inch x 6 inch", "Material": "High-Impact PVC Polymer", "Usage/Application": "Exterior Wall Cladding Casting"},
          76: {"Size": "3 inch x 9 inch", "Material": "High-Impact PVC Polymer", "Usage/Application": "Exterior Wall Cladding Casting"},
          77: {"Size": "6 inch x 6 inch", "Material": "High-Impact PVC Polymer", "Usage/Application": "Exterior Wall Cladding Casting"}
        };
        if (manualSpecs[pageNum]) {
          specifications = manualSpecs[pageNum];
        }
      }

      // Manual overrides for Roller Pan Mixer (p88, p89)
      if (pageNum === 88 || pageNum === 89) {
        specifications = {
          "Power require": "7.5 HP",
          "Diameter": "5 Ft.",
          "Oil": "Requirement for 16 Ltr to 20 Ltr (90 no Gear Oil)",
          "Storage Capacity": "450 Kg.",
          "Mixing": "By Heavy Rollers and Blade for fly ash bricks",
          "Usage": "Mixing of raw material for fly ash bricks",
          "Gear Types": "Powerful worm Reduction gear box transection unite crown pinion (25/1.30/1)"
        };
      }

      // Manual override for Concrete Mixer (p91)
      if (pageNum === 91) {
        specifications = {
          "Power Source 1": "Diesel engine",
          "Power Source 2": "Motar 3 H.P.",
          "Type of Drum": "Tilting Drum Mixer",
          "Material": "Cast Iron",
          "Capacity": "Half Bag / Full Bag",
          "Portable": "Yes (on order)"
        };
      }

      if (Object.keys(specifications).length === 0) {
        // Fallback to text parsing for other pages (machinery, colors, chemicals, sheets)
        for (let i = 0; i < specLines.length; i++) {
          const line = specLines[i];
          const lowerLine = line.toLowerCase();
          
          // Find if this line has a keyword
          const matchingKey = specKeywords.find(keyword => lowerLine.startsWith(keyword));
          if (matchingKey && i + 1 < specLines.length) {
            const val = specLines[i + 1];
            // Simple formatting of the key
            const formattedKey = matchingKey.replace(/\b\w/g, char => char.toUpperCase());
            specifications[formattedKey] = val;
            i++; // Skip the next line as it's the value
          } else if (line.includes(':')) {
            const parts = line.split(':');
            specifications[parts[0].trim()] = parts[1].trim();
          } else {
            // If it doesn't match clean pairs, just add general details if we can
            if (line.length > 3 && !/^\d+$/.test(line)) {
              specifications[`Detail ${i}`] = line;
            }
          }
        }
      }

      // Match image filename
      const matchedImage = imageFiles.find(file => file.startsWith(`p${pageNum}_`)) || `page_${pageNum}.png`;

      productsToInsert.push({
        name,
        category: catInfo.category,
        subcategory: catInfo.subcategory,
        pageNumber: pageNum,
        imageName: matchedImage,
        specifications,
        description: `Premium quality ${name} designed for high-durability production. Meets all industrial quality standards.`
      });
    }

    if (productsToInsert.length > 0) {
      await Product.insertMany(productsToInsert);
      console.log(`Successfully seeded ${productsToInsert.length} products into the database!`);
    } else {
      console.log('No products found to seed.');
    }

    mongoose.disconnect();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.disconnect();
  }
}

seed();

// api/universities.js - Vercel Serverless Function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { country, name } = req.query;
    
    if (!country && !name) {
      return res.status(400).json({ error: 'Please provide country or name parameter' });
    }

    // Build the external API URL
    const baseUrl = 'http://universities.hipolabs.com/search';
    const params = new URLSearchParams();
    
    if (country) params.append('country', country);
    if (name) params.append('name', name);
    
    const apiUrl = `${baseUrl}?${params.toString()}`;
    
    console.log('Fetching from:', apiUrl);

    // Fetch from the external API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Campus-Connect-App'
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Add some metadata
    const result = {
      universities: data,
      count: data.length,
      query: { country, name },
      timestamp: new Date().toISOString()
    };

    res.status(200).json(result);

  } catch (error) {
    console.error('API Error:', error);
    
    // Return sample data as fallback
    const sampleData = getSampleUniversities(req.query.country || req.query.name);
    
    res.status(200).json({
      universities: sampleData,
      count: sampleData.length,
      query: req.query,
      fallback: true,
      message: 'Using sample data due to API unavailability',
      timestamp: new Date().toISOString()
    });
  }
}

function getSampleUniversities(country) {
  const countryKey = country?.toLowerCase() || '';
  
  const sampleData = {
    'india': [
      {
        name: 'Indian Institute of Technology Delhi',
        country: 'India',
        'state-province': 'Delhi',
        domains: ['iitd.ac.in'],
        web_pages: ['https://home.iitd.ac.in/']
      },
      {
        name: 'Indian Institute of Science',
        country: 'India',
        'state-province': 'Karnataka',
        domains: ['iisc.ac.in'],
        web_pages: ['https://iisc.ac.in/']
      },
      {
        name: 'University of Delhi',
        country: 'India',
        'state-province': 'Delhi',
        domains: ['du.ac.in'],
        web_pages: ['https://du.ac.in/']
      },
      {
        name: 'Jawaharlal Nehru University',
        country: 'India',
        'state-province': 'Delhi',
        domains: ['jnu.ac.in'],
        web_pages: ['https://jnu.ac.in/']
      },
      {
        name: 'University of Mumbai',
        country: 'India',
        'state-province': 'Maharashtra',
        domains: ['mu.ac.in'],
        web_pages: ['https://mu.ac.in/']
      },
      {
        name: 'Anna University',
        country: 'India',
        'state-province': 'Tamil Nadu',
        domains: ['annauniv.edu'],
        web_pages: ['https://annauniv.edu/']
      },
      {
        name: 'Jadavpur University',
        country: 'India',
        'state-province': 'West Bengal',
        domains: ['jaduniv.edu.in'],
        web_pages: ['https://jaduniv.edu.in/']
      },
      {
        name: 'University of Calcutta',
        country: 'India',
        'state-province': 'West Bengal',
        domains: ['caluniv.ac.in'],
        web_pages: ['https://caluniv.ac.in/']
      },
      {
        name: 'Banaras Hindu University',
        country: 'India',
        'state-province': 'Uttar Pradesh',
        domains: ['bhu.ac.in'],
        web_pages: ['https://bhu.ac.in/']
      },
      {
        name: 'Aligarh Muslim University',
        country: 'India',
        'state-province': 'Uttar Pradesh',
        domains: ['amu.ac.in'],
        web_pages: ['https://amu.ac.in/']
      }
    ],
    'united states': [
      {
        name: 'Harvard University',
        country: 'United States',
        'state-province': 'Massachusetts',
        domains: ['harvard.edu'],
        web_pages: ['https://harvard.edu/']
      },
      {
        name: 'Stanford University',
        country: 'United States',
        'state-province': 'California',
        domains: ['stanford.edu'],
        web_pages: ['https://stanford.edu/']
      },
      {
        name: 'Massachusetts Institute of Technology',
        country: 'United States',
        'state-province': 'Massachusetts',
        domains: ['mit.edu'],
        web_pages: ['https://mit.edu/']
      },
      {
        name: 'University of California, Berkeley',
        country: 'United States',
        'state-province': 'California',
        domains: ['berkeley.edu'],
        web_pages: ['https://berkeley.edu/']
      },
      {
        name: 'Yale University',
        country: 'United States',
        'state-province': 'Connecticut',
        domains: ['yale.edu'],
        web_pages: ['https://yale.edu/']
      },
      {
        name: 'Princeton University',
        country: 'United States',
        'state-province': 'New Jersey',
        domains: ['princeton.edu'],
        web_pages: ['https://princeton.edu/']
      }
    ],
    'canada': [
      {
        name: 'University of Toronto',
        country: 'Canada',
        'state-province': 'Ontario',
        domains: ['utoronto.ca'],
        web_pages: ['https://utoronto.ca/']
      },
      {
        name: 'McGill University',
        country: 'Canada',
        'state-province': 'Quebec',
        domains: ['mcgill.ca'],
        web_pages: ['https://mcgill.ca/']
      },
      {
        name: 'University of British Columbia',
        country: 'Canada',
        'state-province': 'British Columbia',
        domains: ['ubc.ca'],
        web_pages: ['https://ubc.ca/']
      }
    ],
    'united kingdom': [
      {
        name: 'University of Oxford',
        country: 'United Kingdom',
        'state-province': 'England',
        domains: ['ox.ac.uk'],
        web_pages: ['https://ox.ac.uk/']
      },
      {
        name: 'University of Cambridge',
        country: 'United Kingdom',
        'state-province': 'England',
        domains: ['cam.ac.uk'],
        web_pages: ['https://cam.ac.uk/']
      },
      {
        name: 'Imperial College London',
        country: 'United Kingdom',
        'state-province': 'England',
        domains: ['imperial.ac.uk'],
        web_pages: ['https://imperial.ac.uk/']
      }
    ]
  };

  return sampleData[countryKey] || [];
}
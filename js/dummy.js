const menuData = [
    {
        id: "m01",
        name: "Es Kopi Susu",
        category: "kopi",
        price: 18000,
        description: "Perpaduan kopi pilihan dan susu segar yang pas. Rasa manis yang pas, creamy, namun karakter kopinya tetap terasa kuat. Cocok untuk menemani harimu.",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        id: "m02",
        name: "Matcha Latte",
        category: "kopi",
        price: 22000,
        description: "Rasa matcha yang lembut dengan susu pilihan. Dibuat dengan bubuk matcha premium untuk pengalaman rasa otentik.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        id: "m03",
        name: "Americano",
        category: "kopi",
        price: 16000,
        description: "Kopi hitam klasik dengan rasa yang kuat. Diseduh dari biji kopi arabika pilihan untuk aroma yang menggugah selera.",
        image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        id: "m04",
        name: "Caramel Latte",
        category: "kopi",
        price: 24000,
        description: "Perpaduan kopi, susu, dan sirup karamel yang manis. Memberikan sensasi hangat dan menenangkan.",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        id: "m05",
        name: "Chocolate",
        category: "non-kopi",
        price: 20000,
        description: "Cokelat hangat dengan rasa yang kaya. Dibuat dengan cokelat pekat premium untuk memanjakan lidahmu.",
        image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        id: "m06",
        name: "Lychee Tea",
        category: "non-kopi",
        price: 18000,
        description: "Teh manis dengan aroma leci yang segar. Dilengkapi dengan buah leci asli di dalamnya.",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        id: "m07",
        name: "Nasi Ayam Sambal Matah",
        category: "makanan",
        price: 28000,
        description: "Ayam gurih dengan sambal matah khas Bali. Disajikan dengan nasi hangat dan telur mata sapi.",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        id: "m08",
        name: "Spaghetti Carbonara",
        category: "makanan",
        price: 32000,
        description: "Pasta creamy dengan smoked beef dan taburan keju parmesan. Tekstur saus yang kental dan gurih.",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        id: "m09",
        name: "French Fries",
        category: "makanan",
        price: 16000,
        description: "Kentang goreng renyah dengan bumbu pilihan. Teman sempurna untuk ngobrol santai.",
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        id: "m10",
        name: "Cheesecake",
        category: "dessert",
        price: 20000,
        description: "Lembut, manis, dan pas untuk teman ngopi. Dibuat dengan cream cheese berkualitas tinggi.",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        id: "m11",
        name: "Chocolate Lava",
        category: "dessert",
        price: 24000,
        description: "Cokelat lumer di setiap gigitan. Disajikan hangat, sempurna dipadukan dengan kopi dingin.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        featured: false
    }
];

// Format angka ke Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// Data Dummy Pesanan
const ordersData = [
    {
        id: "NK-005",
        status: "diproses",
        statusLabel: "Diproses",
        icon: "ph-clock",
        table: "Meja A03",
        itemCount: 2,
        date: "12 Okt 2026, 10:24",
        total: 40000,
        mainImage: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80",
        items: [
            { name: "Es Kopi Susu", qty: 1, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=100&q=80" },
            { name: "Matcha Latte", qty: 1, img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" }
        ],
        extra: 0
    },
    {
        id: "NK-004",
        status: "siap",
        statusLabel: "Siap Disajikan",
        icon: "ph-chef-hat",
        table: "Meja B01",
        itemCount: 3,
        date: "12 Okt 2026, 11:03",
        total: 56000,
        mainImage: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80",
        items: [
            { name: "Nasi Ayam Sambal Matah", qty: 1, img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=100&q=80" },
            { name: "Es Lemon Tea", qty: 1, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=100&q=80" }
        ],
        extra: 1
    },
    {
        id: "NK-003",
        status: "selesai",
        statusLabel: "Selesai",
        icon: "ph-check-circle",
        table: "Meja C02",
        itemCount: 1,
        date: "11 Okt 2026, 16:45",
        total: 20000,
        mainImage: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
        items: [
            { name: "Cheesecake", qty: 1, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=100&q=80" }
        ],
        extra: 0
    },
    {
        id: "NK-002",
        status: "selesai",
        statusLabel: "Selesai",
        icon: "ph-check-circle",
        table: "Meja A01",
        itemCount: 2,
        date: "10 Okt 2026, 14:12",
        total: 32000,
        mainImage: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=400&q=80",
        items: [
            { name: "Chocolate Latte", qty: 1, img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=100&q=80" },
            { name: "French Fries", qty: 1, img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=100&q=80" }
        ],
        extra: 0
    }
];
export type Language = 'ko' | 'en' | 'uz' | 'vi' | 'zh';

export interface Translation {
  // Navigation
  home: string;
  restaurants: string;
  facilities: string;
  favorites: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  searchRestaurant: string;
  searchFacility: string;
  
  // Restaurant page
  studentCafeteria: string;
  cafe: string;
  restaurant: string;
  viewMenu: string;
  location: string;
  hours: string;
  showAll: string;
  allDiet: string;
  halal: string;
  noPork: string;
  vegan: string;
  viewOnMap: string;
  
  // Menu details
  price: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  containsPork: string;
  spicy: string;
  vegetarian: string;
  addToFavorites: string;
  removeFromFavorites: string;
  
  // Facilities
  bookstore: string;
  healthCenter: string;
  landmark: string;
  facilityInfo: string;
  howToUse: string;
  viewGuide: string;
  
  // Favorites
  myFavorites: string;
  noFavoritesYet: string;
  exploreFoods: string;
  
  // Inquiry Board
  inquiryBoard: string;
  askQuestion: string;
  questionTitle: string;
  questionContent: string;
  submit: string;
  titlePlaceholder: string;
  contentPlaceholder: string;
  submittedAt: string;
  noInquiries: string;
  inquiryType: string;
  question: string;
  request: string;
  questions: string;
  requests: string;

  // Learning Center
  learningCenter: string;
  listeningAndSpeaking: string;

  // Restaurant Detail
  selectRestaurant: string;
  backToRestaurants: string;
  menu: string;
  allMenus: string;
  directions: string;
  closeMap: string;
  
  // Restaurant Status
  operatingStatus: string;
  open: string;
  closed: string;
  busy: string;
  crowdingLevel: string;
  empty: string;
  slightlyCrowded: string;
  moderate: string;
  quite: string;
  veryCrowded: string;

  // Map Legend
  mapDescription: string;
  redRestaurants: string;
  blueCafes: string;
  yellowFacilities: string;
  purpleMainGate: string;
  orangeSouthGate: string;
  greenMyLocation: string;
  campusLocations: string;
  
  // Reply feature
  replies: string;
  reply: string;
  writeReply: string;
  replyPlaceholder: string;
  noReplies: string;
  adminReply: string;
  viewReplies: string;
  hideReplies: string;
  
  // Current Location
  myLocation: string;
  currentLocationInfo: string;
  locationNotAvailable: string;
  gettingLocation: string;
  
  // Directions
  walking: string;
  transit: string;
  routeNotFound: string;
  routeInfo: string;
  distance: string;
  duration: string;
  minutes: string;
  fromMainGate: string;
  fromSouthGate: string;
  fromMyLocation: string;
  startingPoint: string;
  
  // Common
  backToHome: string;
  loading: string;
  error: string;
}

export const translations: Record<Language, Translation> = {
  ko: {
    // Navigation
    home: '홈',
    restaurants: '식당',
    facilities: '시설',
    favorites: '즐겨찾기',
    
    // Hero section
    heroTitle: '캠퍼스 투어',
    heroSubtitle: '원광대학교 식당 및 시설 안내',
    searchRestaurant: '식당 찾기',
    searchFacility: '시설 찾기',
    
    // Restaurant page
    studentCafeteria: '학생식당',
    cafe: '카페',
    restaurant: '일반식당',
    viewMenu: '메뉴 보기',
    location: '위치',
    hours: '운영시간',
    showAll: '모두보기',
    allDiet: '식단 전체',
    halal: '할랄',
    noPork: '돼지고기 없음',
    vegan: '비건',
    viewOnMap: '지도 보기',
    
    // Menu details
    price: '가격',
    monday: '월요일',
    tuesday: '화요일',
    wednesday: '수요일',
    thursday: '목요일',
    friday: '금요일',
    containsPork: '돼지고기 포함',
    spicy: '매운맛',
    vegetarian: '채식',
    addToFavorites: '즐겨찾기 추가',
    removeFromFavorites: '즐겨찾기 제거',
    
    // Facilities
    bookstore: '서점',
    healthCenter: '건강공제센터',
    landmark: '랜드마크',
    facilityInfo: '시설정보',
    howToUse: '이용방법',
    viewGuide: '가이드 보기',
    
    // Favorites
    myFavorites: '내 즐겨찾기',
    noFavoritesYet: '아직 즐겨찾기가 없습니다',
    exploreFoods: '메뉴 탐색하기',

    // Inquiry Board
    inquiryBoard: '문의 게시판',
    askQuestion: '질문하기',
    questionTitle: '제목',
    questionContent: '내용',
    submit: '제출',
    titlePlaceholder: '제목을 입력하세요',
    contentPlaceholder: '질문이나 요청 내용을 입력하세요',
    submittedAt: '제출됨',
    noInquiries: '아직 문의가 없습니다',
    inquiryType: '문의 유형',
    question: '질문',
    request: '요청',
    questions: '질문',
    requests: '요청',

    // Learning Center
    learningCenter: '학습 센터',
    listeningAndSpeaking: '듣기 & 말하기',

    // Restaurant Detail
    selectRestaurant: '식당 선택',
    backToRestaurants: '식당 선택으로 돌아가기',
    menu: '메뉴',
    allMenus: '전체 메뉴',
    directions: '길찾기',
    closeMap: '지도 닫기',

    // Map Legend
    mapDescription: '지도에서 식당과 시설의 정확한 위치를 확인하세요',
    redRestaurants: '빨간색: 식당',
    blueCafes: '파란색: 카페',
    yellowFacilities: '노란색: 시설',
    purpleMainGate: '보라색: 정문',
    orangeSouthGate: '주황색: 남문',
    greenMyLocation: '초록색: 내 위치',
    campusLocations: '캠퍼스 위치',
    
    // Restaurant Status
    operatingStatus: '운영 상태',
    open: '영업중',
    closed: '영업종료',
    busy: '바쁜중',
    crowdingLevel: '혼잡도',
    empty: '한산함',
    slightlyCrowded: '약간 붐빔',
    moderate: '보통',
    quite: '꽤 붐빔',
    veryCrowded: '매우 붐빔',
    
    // Reply feature
    replies: '답변',
    reply: '답변',
    writeReply: '답변 작성',
    replyPlaceholder: '답변 내용을 입력하세요',
    noReplies: '아직 답변이 없습니다',
    adminReply: '관리자 답변',
    viewReplies: '답변 보기',
    hideReplies: '답변 숨기기',
    
    // Current Location
    myLocation: '내 위치',
    currentLocationInfo: '현재 위치가 초록색 마커로 표시됩니다',
    locationNotAvailable: '위치 정보를 사용할 수 없습니다',
    gettingLocation: '위치 확인 중...',
    
    // Directions
    walking: '도보',
    transit: '대중교통',
    routeNotFound: '경로를 찾을 수 없습니다. 현재 위치가 캠퍼스 근처인지 확인해주세요.',
    routeInfo: '경로 정보',
    distance: '거리',
    duration: '소요시간',
    minutes: '분',
    fromMainGate: '정문에서 출발',
    fromSouthGate: '남문에서 출발',
    fromMyLocation: '내 위치에서 출발',
    startingPoint: '출발지',
    
    // Common
    backToHome: '홈으로',
    loading: '로딩중...',
    error: '오류가 발생했습니다',
  },
  en: {
    // Navigation
    home: 'Home',
    restaurants: 'Restaurants',
    facilities: 'Facilities',
    favorites: 'Favorites',
    
    // Hero section
    heroTitle: 'Campus Tour',
    heroSubtitle: 'Wonkwang University Dining & Facilities Guide',
    searchRestaurant: 'Find Restaurant',
    searchFacility: 'Find Facility',
    
    // Restaurant page
    studentCafeteria: 'Student Cafeteria',
    cafe: 'Cafe',
    restaurant: 'Restaurant',
    viewMenu: 'View Menu',
    location: 'Location',
    hours: 'Hours',
    showAll: 'Show All',
    allDiet: 'All Diet',
    halal: 'Halal',
    noPork: 'No Pork',
    vegan: 'Vegan',
    viewOnMap: 'View on Map',
    
    // Menu details
    price: 'Price',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    containsPork: 'Contains Pork',
    spicy: 'Spicy',
    vegetarian: 'Vegetarian',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    
    // Facilities
    bookstore: 'Bookstore',
    healthCenter: 'Health Center',
    landmark: 'Landmark',
    facilityInfo: 'Facility Info',
    howToUse: 'How to Use',
    viewGuide: 'View Guide',
    
    // Favorites
    myFavorites: 'My Favorites',
    noFavoritesYet: 'No favorites yet',
    exploreFoods: 'Explore Foods',

    // Inquiry Board
    inquiryBoard: 'Inquiry Board',
    askQuestion: 'Ask a Question',
    questionTitle: 'Title',
    questionContent: 'Content',
    submit: 'Submit',
    titlePlaceholder: 'Enter your question title',
    contentPlaceholder: 'Enter your question or request',
    submittedAt: 'Submitted at',
    noInquiries: 'No inquiries yet',
    inquiryType: 'Inquiry Type',
    question: 'Question',
    request: 'Request',
    questions: 'Questions',
    requests: 'Requests',

    // Learning Center
    learningCenter: 'Learning Center',
    listeningAndSpeaking: 'Listening & Speaking',

    // Restaurant Detail
    selectRestaurant: 'Select a Restaurant',
    backToRestaurants: 'Back to Restaurants',
    menu: 'Menu',
    allMenus: 'All Menus',
    directions: 'Directions',
    closeMap: 'Close Map',

    // Map Legend
    mapDescription: 'Find exact locations of restaurants and facilities on the map',
    redRestaurants: 'Red: Restaurants',
    blueCafes: 'Blue: Cafes',
    yellowFacilities: 'Yellow: Facilities',
    purpleMainGate: 'Purple: Main Gate',
    orangeSouthGate: 'Orange: South Gate',
    greenMyLocation: 'Green: My Location',
    campusLocations: 'Campus Locations',
    
    // Restaurant Status
    operatingStatus: 'Operating Status',
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
    crowdingLevel: 'Crowding Level',
    empty: 'Empty',
    slightlyCrowded: 'Slightly Crowded',
    moderate: 'Moderate',
    quite: 'Quite Crowded',
    veryCrowded: 'Very Crowded',
    
    // Reply feature
    replies: 'Replies',
    reply: 'Reply',
    writeReply: 'Write a Reply',
    replyPlaceholder: 'Enter your reply',
    noReplies: 'No replies yet',
    adminReply: 'Admin Reply',
    viewReplies: 'View Replies',
    hideReplies: 'Hide Replies',
    
    // Current Location
    myLocation: 'My Location',
    currentLocationInfo: 'Your current location is shown with a green marker',
    locationNotAvailable: 'Location not available',
    gettingLocation: 'Getting location...',
    
    // Directions
    walking: 'Walking',
    transit: 'Transit',
    routeNotFound: 'Route not found. Please check if your location is near the campus.',
    routeInfo: 'Route Info',
    distance: 'Distance',
    duration: 'Duration',
    minutes: 'min',
    fromMainGate: 'From Main Gate',
    fromSouthGate: 'From South Gate',
    fromMyLocation: 'From My Location',
    startingPoint: 'Starting Point',
    
    // Common
    backToHome: 'Back to Home',
    loading: 'Loading...',
    error: 'An error occurred',
  },
  uz: {
    // Navigation
    home: 'Bosh sahifa',
    restaurants: 'Ovqatlanish',
    facilities: 'Ob\'yektlar',
    favorites: 'Sevimlilar',
    
    // Hero section
    heroTitle: 'Kampus Sayohati',
    heroSubtitle: 'Wonkwang Universiteti Ovqatlanish va Xizmatlar',
    searchRestaurant: 'Restoran Qidirish',
    searchFacility: 'Ob\'yekt Qidirish',
    
    // Restaurant page
    studentCafeteria: 'Talabalar Oshxonasi',
    cafe: 'Kafe',
    restaurant: 'Restoran',
    viewMenu: 'Menyuni Ko\'rish',
    location: 'Joylashuvi',
    hours: 'Ish Vaqti',
    showAll: 'Hammasini Ko\'rsatish',
    allDiet: 'Barcha Parhez',
    halal: 'Halol',
    noPork: 'Cho\'chqasiz',
    vegan: 'Vegan',
    viewOnMap: 'Xaritada Ko\'rish',
    
    // Menu details
    price: 'Narxi',
    monday: 'Dushanba',
    tuesday: 'Seshanba',
    wednesday: 'Chorshanba',
    thursday: 'Payshanba',
    friday: 'Juma',
    containsPork: 'Cho\'chqa Go\'shti Bor',
    spicy: 'Achchiq',
    vegetarian: 'Vegetarian',
    addToFavorites: 'Sevimliga Qo\'shish',
    removeFromFavorites: 'Sevimlilardan O\'chirish',
    
    // Facilities
    bookstore: 'Kitob Do\'koni',
    healthCenter: 'Tibbiy Markaz',
    landmark: 'Belgi',
    facilityInfo: 'Ma\'lumot',
    howToUse: 'Foydalanish',
    viewGuide: 'Yo\'riqnoma',
    
    // Favorites
    myFavorites: 'Mening Sevimlilarim',
    noFavoritesYet: 'Hozircha sevimlilar yo\'q',
    exploreFoods: 'Taomlarni Ko\'rish',

    // Inquiry Board
    inquiryBoard: 'So\'rovnoma Taxtasi',
    askQuestion: 'Savollar So\'rash',
    questionTitle: 'Sarlavha',
    questionContent: 'Mazmun',
    submit: 'Yuborish',
    titlePlaceholder: 'Sarlavhasini kiriting',
    contentPlaceholder: 'Savolni kiriting',
    submittedAt: 'Yuborilgan',
    noInquiries: 'Hozircha so\'rovlar yo\'q',
    inquiryType: 'So\'rov Turi',
    question: 'Savol',
    request: 'So\'rov',
    questions: 'Savollar',
    requests: 'So\'rovlar',

    // Learning Center
    learningCenter: 'O\'rganish Markazi',
    listeningAndSpeaking: 'Eshitish & Gaplash',

    // Restaurant Detail
    selectRestaurant: 'Restorani tanlang',
    backToRestaurants: 'Restoranlarga qaytish',
    menu: 'Menyu',
    allMenus: 'Barcha Menyular',
    directions: 'Yo\'nalishlar',
    closeMap: 'Xaritani yopish',

    // Map Legend
    mapDescription: 'Xaritada restoranlar va ob\'yektlarning aniq joylashuvini toping',
    redRestaurants: 'Qizil: Restoranlar',
    blueCafes: 'Ko\'k: Kafeler',
    yellowFacilities: 'Sariq: Ob\'yektlar',
    purpleMainGate: 'Binafsha: Bosh Darvoza',
    orangeSouthGate: 'Apelsin: Janubiy Darvoza',
    greenMyLocation: 'Yashil: Mening Joylashuvim',
    campusLocations: 'Kampus joylashuvi',
    
    // Restaurant Status
    operatingStatus: 'Faoliyat Holati',
    open: 'Ochiq',
    closed: 'Yopiq',
    busy: 'Band',
    crowdingLevel: 'Shaxmatarning Darajasi',
    empty: 'Bo\'sh',
    slightlyCrowded: 'Biroz Bandirlash',
    moderate: 'O\'rtacha',
    quite: 'Juda Bandirlash',
    veryCrowded: 'Juda Ko\'p Bandirlash',
    
    // Reply feature
    replies: 'Javoblar',
    reply: 'Javob',
    writeReply: 'Javob Yozish',
    replyPlaceholder: 'Javobingizni kiriting',
    noReplies: 'Hali javoblar yo\'q',
    adminReply: 'Admin Javobi',
    viewReplies: 'Javoblarni Ko\'rish',
    hideReplies: 'Javoblarni Yashirish',
    
    // Current Location
    myLocation: 'Mening joylashuvim',
    currentLocationInfo: 'Sizning joriy joylashuvingiz yashil marker bilan ko\'rsatilgan',
    locationNotAvailable: 'Joylashuv mavjud emas',
    gettingLocation: 'Joylashuv aniqlanmoqda...',
    
    // Directions
    walking: 'Piyoda',
    transit: 'Jamoat transporti',
    routeNotFound: 'Yo\'nalish topilmadi. Joylashuvingiz kampus yaqinida ekanligini tekshiring.',
    routeInfo: 'Yo\'nalish ma\'lumoti',
    distance: 'Masofa',
    duration: 'Vaqt',
    minutes: 'daqiqa',
    fromMainGate: 'Bosh darvozadan',
    fromSouthGate: 'Janubiy darvozadan',
    fromMyLocation: 'Mening joylashuvimdan',
    startingPoint: 'Boshlang\'ich nuqta',
    
    // Common
    backToHome: 'Bosh Sahifaga',
    loading: 'Yuklanmoqda...',
    error: 'Xatolik yuz berdi',
  },
  vi: {
    // Navigation
    home: 'Trang chủ',
    restaurants: 'Nhà hàng',
    facilities: 'Cơ sở',
    favorites: 'Yêu thích',
    
    // Hero section
    heroTitle: 'Campus Tour',
    heroSubtitle: 'Hướng dẫn Ăn uống & Tiện ích Đại học Wonkwang',
    searchRestaurant: 'Tìm Nhà hàng',
    searchFacility: 'Tìm Cơ sở',
    
    // Restaurant page
    studentCafeteria: 'Căng tin Sinh viên',
    cafe: 'Quán cà phê',
    restaurant: 'Nhà hàng',
    viewMenu: 'Xem Thực đơn',
    location: 'Vị trí',
    hours: 'Giờ mở cửa',
    showAll: 'Hiển thị tất cả',
    allDiet: 'Tất cả chế độ ăn',
    halal: 'Halal',
    noPork: 'Không thịt lợn',
    vegan: 'Thuần chay',
    viewOnMap: 'Xem trên Bản đồ',
    
    // Menu details
    price: 'Giá',
    monday: 'Thứ Hai',
    tuesday: 'Thứ Ba',
    wednesday: 'Thứ Tư',
    thursday: 'Thứ Năm',
    friday: 'Thứ Sáu',
    containsPork: 'Có thịt lợn',
    spicy: 'Cay',
    vegetarian: 'Chay',
    addToFavorites: 'Thêm vào Yêu thích',
    removeFromFavorites: 'Xóa khỏi Yêu thích',
    
    // Facilities
    bookstore: 'Hiệu sách',
    healthCenter: 'Trung tâm Y tế',
    landmark: 'Địa danh',
    facilityInfo: 'Thông tin',
    howToUse: 'Cách sử dụng',
    viewGuide: 'Xem Hướng dẫn',
    
    // Favorites
    myFavorites: 'Yêu thích của tôi',
    noFavoritesYet: 'Chưa có mục yêu thích',
    exploreFoods: 'Khám phá Món ăn',

    // Inquiry Board
    inquiryBoard: 'Bảng Hỏi Đáp',
    askQuestion: 'Đặt Câu Hỏi',
    questionTitle: 'Tiêu Đề',
    questionContent: 'Nội Dung',
    submit: 'Gửi',
    titlePlaceholder: 'Nhập tiêu đề câu hỏi',
    contentPlaceholder: 'Nhập câu hỏi hoặc yêu cầu',
    submittedAt: 'Gửi lúc',
    noInquiries: 'Chưa có câu hỏi',
    inquiryType: 'Loại Câu Hỏi',
    question: 'Câu Hỏi',
    request: 'Yêu Cầu',
    questions: 'Câu Hỏi',
    requests: 'Yêu Cầu',

    // Learning Center
    learningCenter: 'Trung tâm Học tập',
    listeningAndSpeaking: 'Nghe & Nói',

    // Restaurant Detail
    selectRestaurant: 'Chọn nhà hàng',
    backToRestaurants: 'Quay lại chọn nhà hàng',
    menu: 'Thực đơn',
    allMenus: 'Tất cả thực đơn',
    directions: 'Hướng dẫn',
    closeMap: 'Đóng bản đồ',

    // Map Legend
    mapDescription: 'Tìm vị trí chính xác của nhà hàng và cơ sở trên bản đồ',
    redRestaurants: 'Đỏ: Nhà hàng',
    blueCafes: 'Xanh: Quán cà phê',
    yellowFacilities: 'Vàng: Cơ sở',
    purpleMainGate: 'Tím: Cổng Chính',
    orangeSouthGate: 'Cam: Cổng Nam',
    greenMyLocation: 'Xanh lá: Vị trí của tôi',
    campusLocations: 'Vị trí khuôn viên',
    
    // Restaurant Status
    operatingStatus: 'Tình trạng Hoạt động',
    open: 'Mở cửa',
    closed: 'Đóng cửa',
    busy: 'Bận rộn',
    crowdingLevel: 'Mức độ Đông Đúc',
    empty: 'Vắng vẻ',
    slightlyCrowded: 'Hơi đông',
    moderate: 'Vừa phải',
    quite: 'Khá đông',
    veryCrowded: 'Rất đông',
    
    // Reply feature
    replies: 'Phản hồi',
    reply: 'Trả lời',
    writeReply: 'Viết Phản hồi',
    replyPlaceholder: 'Nhập phản hồi của bạn',
    noReplies: 'Chưa có phản hồi',
    adminReply: 'Phản hồi Admin',
    viewReplies: 'Xem Phản hồi',
    hideReplies: 'Ẩn Phản hồi',
    
    // Current Location
    myLocation: 'Vị trí của tôi',
    currentLocationInfo: 'Vị trí hiện tại của bạn được hiển thị bằng điểm đánh dấu màu xanh lá cây',
    locationNotAvailable: 'Vị trí không khả dụng',
    gettingLocation: 'Đang lấy vị trí...',
    
    // Directions
    walking: 'Đi bộ',
    transit: 'Phương tiện công cộng',
    routeNotFound: 'Không tìm thấy lộ trình. Vui lòng kiểm tra xem vị trí của bạn có gần khuôn viên trường không.',
    routeInfo: 'Thông tin lộ trình',
    distance: 'Khoảng cách',
    duration: 'Thời gian',
    minutes: 'phút',
    fromMainGate: 'Từ Cổng chính',
    fromSouthGate: 'Từ Cổng Nam',
    fromMyLocation: 'Từ vị trí của tôi',
    startingPoint: 'Điểm xuất phát',
    
    // Common
    backToHome: 'Về Trang chủ',
    loading: 'Đang tải...',
    error: 'Đã xảy ra lỗi',
  },
  zh: {
    // Navigation
    home: '首页',
    restaurants: '餐厅',
    facilities: '设施',
    favorites: '收藏',
    
    // Hero section
    heroTitle: '校园导览',
    heroSubtitle: '圆光大学餐饮与设施指南',
    searchRestaurant: '查找餐厅',
    searchFacility: '查找设施',
    
    // Restaurant page
    studentCafeteria: '学生食堂',
    cafe: '咖啡厅',
    restaurant: '餐厅',
    viewMenu: '查看菜单',
    location: '位置',
    hours: '营业时间',
    showAll: '显示全部',
    allDiet: '全部饮食',
    halal: '清真',
    noPork: '无猪肉',
    vegan: '纯素',
    viewOnMap: '在地图上查看',
    
    // Menu details
    price: '价格',
    monday: '星期一',
    tuesday: '星期二',
    wednesday: '星期三',
    thursday: '星期四',
    friday: '星期五',
    containsPork: '含猪肉',
    spicy: '辣',
    vegetarian: '素食',
    addToFavorites: '添加收藏',
    removeFromFavorites: '取消收藏',
    
    // Facilities
    bookstore: '书店',
    healthCenter: '健康中心',
    landmark: '地标',
    facilityInfo: '设施信息',
    howToUse: '使用方法',
    viewGuide: '查看指南',
    
    // Favorites
    myFavorites: '我的收藏',
    noFavoritesYet: '暂无收藏',
    exploreFoods: '探索美食',

    // Inquiry Board
    inquiryBoard: '问卷板',
    askQuestion: '提问',
    questionTitle: '标题',
    questionContent: '内容',
    submit: '提交',
    titlePlaceholder: '输入问题标题',
    contentPlaceholder: '输入您的问题或请求',
    submittedAt: '提交于',
    noInquiries: '暂无问题',
    inquiryType: '问卷类型',
    question: '问题',
    request: '请求',
    questions: '问题',
    requests: '请求',

    // Learning Center
    learningCenter: '学习中心',
    listeningAndSpeaking: '听力和口语',

    // Restaurant Detail
    selectRestaurant: '选择餐厅',
    backToRestaurants: '返回选择餐厅',
    menu: '菜单',
    allMenus: '所有菜单',
    directions: '路线',
    closeMap: '关闭地图',

    // Map Legend
    mapDescription: '在地图上查找餐厅和设施的准确位置',
    redRestaurants: '红色: 餐厅',
    blueCafes: '蓝色: 咖啡馆',
    yellowFacilities: '黄色: 设施',
    purpleMainGate: '紫色: 正门',
    orangeSouthGate: '橙色: 南门',
    greenMyLocation: '绿色: 我的位置',
    campusLocations: '校园位置',
    
    // Restaurant Status
    operatingStatus: '营业状态',
    open: '营业中',
    closed: '已关闭',
    busy: '繁忙',
    crowdingLevel: '拥挤程度',
    empty: '空闲',
    slightlyCrowded: '略微拥挤',
    moderate: '中等',
    quite: '相当拥挤',
    veryCrowded: '非常拥挤',
    
    // Reply feature
    replies: '回复',
    reply: '回复',
    writeReply: '写回复',
    replyPlaceholder: '输入您的回复',
    noReplies: '暂无回复',
    adminReply: '管理员回复',
    viewReplies: '查看回复',
    hideReplies: '隐藏回复',
    
    // Current Location
    myLocation: '我的位置',
    currentLocationInfo: '您的当前位置用绿色标记显示',
    locationNotAvailable: '位置不可用',
    gettingLocation: '正在获取位置...',
    
    // Directions
    walking: '步行',
    transit: '公共交通',
    routeNotFound: '找不到路线。请确认您的位置是否在校园附近。',
    routeInfo: '路线信息',
    distance: '距离',
    duration: '时间',
    minutes: '分钟',
    fromMainGate: '从正门出发',
    fromSouthGate: '从南门出发',
    fromMyLocation: '从我的位置出发',
    startingPoint: '出发点',
    
    // Common
    backToHome: '回首页',
    loading: '加载中...',
    error: '发生错误',
  },
};

export const languageNames: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
  uz: 'O\'zbekcha',
  vi: 'Tiếng Việt',
  zh: '中文',
};

export const languageFlags: Record<Language, string> = {
  ko: '🇰🇷',
  en: '🇬🇧',
  uz: '🇺🇿',
  vi: '🇻🇳',
  zh: '🇨🇳',
};

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations.en;
}

export function getCurrentLanguage(): Language {
  const stored = localStorage.getItem('campus-tour-language');
  if (stored && ['ko', 'en', 'uz', 'vi', 'zh'].includes(stored)) {
    return stored as Language;
  }
  return 'ko'; // Default to Korean
}

export function setCurrentLanguage(lang: Language): void {
  localStorage.setItem('campus-tour-language', lang);
}

## Movietime
 - It is an online database of information related to Movies,Web series.
 - Live site (https://ravinakhate.github.io/movietime/).
 
## Installation
```bash
https://github.com/RaviNakhate/RaviNakhate.git
```

## Install Package

```bash
npm install react-router-dom
```

```bash
npm install axios
```

```bash
npm i swipper
```

```bash
node i sass

```

```bash
npm install @mui/material @emotion/react @emotion/styled

```

```bash
npm i react-bootstrap
```

## Components Tree-Structer
```bash
├── MovieTime
│   ├── One
│   │   ├──header
│   │   ├──banner
│   │   ├──homeSlide (API-Trending,Upcoming,Popular,...)
│   │   │   ├──slideContain1
│   │   │   │    └──card (API-details)
│   │   │   ├──slideContain2
│   │   │   │    └──card (API-details)
│   │   │   └──slideContain...
│   │   │        └──card... (API-details)
│   │   └──footer
│   └── Two
│       ├──header
│       ├──banner
│       ├──homeSearch (API-multiSearch)
│       │   └──search (filter-off)
│       │       └──card (API-details)
│       └──footer
│
├── Movie
│   ├── header
│   ├── category (API-MovieSearch)
│   │    ├──search (filter-on)
│   │    │    └──card (API-details)
│   │    └──pagination
│   └── footer
└── WebSeries
    ├── header
    ├── category (API-webSeriesSearch)
    │    ├──search (filter-on)
    │    │    └──card (API-details)
    │    └──pagination
    └── footer
```

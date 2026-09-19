# Apply Tracker — İş Başvuru Takip Sistemi

Kendi iş başvurularını (şirket, pozisyon, durum, takip tarihi, kullanılan CV versiyonu vb.)
takip etmek için full-stack bir web uygulaması.

**Stack:** Spring Boot (Java, REST API) · PostgreSQL · Angular + Angular Material · Docker

## Hızlı Başlangıç (Docker ile — önerilen)

Tek gereksinim: [Docker](https://www.docker.com/) kurulu olması.

```bash
docker compose up --build
```

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/api/applications
- Swagger UI: http://localhost:8080/swagger-ui.html

İlk açılışta veritabanı boş gelir; "Yeni Başvuru" ile ekleyebilirsin.

## Docker olmadan, elle çalıştırmak

### Backend (Java 17+ ve Maven gerekli)

Postgres kurmadan, hızlıca denemek için H2 (bellek içi veritabanı) profiliyle:

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Gerçek Postgres ile çalıştırmak için önce bir Postgres instance'ı ayağa kaldır, sonra:

```bash
cd backend
export DB_HOST=localhost DB_PORT=5432 DB_NAME=apply_tracker DB_USER=apply_tracker DB_PASSWORD=apply_tracker
mvn spring-boot:run
```

### Frontend (Node.js 20+ gerekli)

```bash
cd frontend
npm install
npx ng serve
```

http://localhost:4200 adresinden açılır; backend'in `localhost:8080`'de çalışıyor olması gerekir
(bkz. `src/environments/environment.ts`).

## Proje Yapısı

```
apply-tracker/
├── backend/          Spring Boot REST API (Java)
│   └── src/main/java/com/applytracker/
│       ├── domain/       JPA entity + enum
│       ├── repository/   Spring Data JPA
│       ├── service/      İş mantığı
│       ├── dto/          API request/response modelleri
│       ├── web/          REST controller + hata yönetimi
│       └── config/       CORS ayarı
├── frontend/         Angular uygulaması
│   └── src/app/
│       ├── core/                 Model + HTTP servis
│       └── features/
│           ├── application-list/  Liste + filtre ekranı
│           └── application-form/  Ekle/düzenle formu
├── docker-compose.yml
└── .github/workflows/ci.yml   Otomatik build (backend + frontend)
```

## API Uç Noktaları

| Metod  | Yol                      | Açıklama                          |
|--------|---------------------------|------------------------------------|
| GET    | `/api/applications`        | Tüm başvurular (`?status=` ile filtrelenebilir) |
| GET    | `/api/applications/{id}`   | Tek başvuru                        |
| POST   | `/api/applications`        | Yeni başvuru oluştur                |
| PUT    | `/api/applications/{id}`   | Başvuru güncelle                    |
| DELETE | `/api/applications/{id}`   | Başvuru sil                         |

Durum (`status`) değerleri: `APPLIED, REVIEWING, INTERVIEW_PENDING, INTERVIEWED, OFFER, REJECTED, WITHDRAWN`

## AI-Assisted Development

Bu projenin backend ve frontend kod iskeleti, kod tabanı ve Docker altyapısı Claude ile
birlikte, AI destekli bir geliştirme akışıyla oluşturuldu:

- Frontend gerçek Angular CLI ile scaffold edildi ve **derlenerek doğrulandı** (`ng build` başarılı).
- Backend kodu elle yazıldı; kod incelemesi ve derleme doğrulaması geliştirici tarafında
  (yerel Maven ortamında) yapılmalıdır — bu, AI çıktısının gözden geçirilmeden production'a
  alınmaması gerektiğinin bilinçli bir örneğidir.
- Mimari kararlar (DTO/entity ayrımı, global exception handling, CORS, Docker multi-stage build)
  bilinçli olarak seçildi ve gerekçelendirildi.

## Lisans

Kişisel portföy projesi.

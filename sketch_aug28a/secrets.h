#include <pgmspace.h>
 
#define SECRET
 
const char WIFI_SSID[] = "Bbox-D9FA8E70";
const char WIFI_PASSWORD[] = "N3pkYAUR16qus21pnp";
 
#define THINGNAME "Lampe"
 
int8_t TIME_ZONE = 0; //NYC(USA): -5 UTC
 
const char MQTT_HOST[] = "agkj70tot2l60-ats.iot.eu-north-1.amazonaws.com";
 
 
static const char cacert[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
)EOF";
 
 
// Copy contents from XXXXXXXX-certificate.pem.crt here ▼
static const char client_cert[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVAMfzDiIoujnnWjvQG5M706jEQZbLMA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yMzA4MDcyMzM0
MzlaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1I78Mo+RvTAgsWgkz
yvpmOxkTg2dHp0cgG6XP2jH79DuX4lh+P0UBBZXlJm0r4ZbUoN01P4KteFIJjkEn
cOi+0QSZRfHsX07v6dS9wJ8PYN+jLmxD61/vhcwb9BmYRLP23OJ/rFATnCvYvYFa
UwU5NPBftDbsqhCVFRmJSW1hR2C3ZD7uMvYs7H1po4bX4LX7ACbYIqKlKAAphz+b
04P4cw8AbA9eiZ1+JyCY2y3BVUzvmq34hwAS7ooChTQgA61xcFtH9v7XoIlBjPqb
P3Qw9wzJYiJDRGVo4h54xiSEufbiWgbkCG2ry3d22K/G06w2dsUbrji1+TK8ZEsD
UrtzAgMBAAGjYDBeMB8GA1UdIwQYMBaAFNdwo1F4LqEbrJw0sPgDBwuxK1i1MB0G
A1UdDgQWBBQioFrue5hcsYbFDYQeyXZ9952KdjAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAKSrYDUO7omaNMVs3kERrxiJp
Y8aQGOi5EkjZ4pFokPeLyy2gW/ENYDyawmA+NqNaLPcNxzMnVPdg3PdUvcL+NOe2
BivHF9hj+CTAXr1qDr+1n/9Mj8vQJEv//n8iR7+aEyr77gvpNQUjlT3PyxBUpYSj
12epZrWD5x9d6Z43a/Uoyb8yUnGnqPfqHrkk/RrERV9CbuhN4xgoR8wm2LCD4ylK
Ly+Pv53VLpW24+FMMNI5zBwJ+aoWQ/SeQ0DJj5I7IYRe7cXu4QALGQ8c3T9n+Amr
fhMonvNBFL5TvJHJh1YepRY688pSrf3JoA5Qbxe8ALtq9qeVwFBCkkwQgzRsQA==
-----END CERTIFICATE-----

 
)KEY";
 
 
// Copy contents from  XXXXXXXX-private.pem.key here ▼
static const char privkey[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAtSO/DKPkb0wILFoJM8r6ZjsZE4NnR6dHIBulz9ox+/Q7l+JY
fj9FAQWV5SZtK+GW1KDdNT+CrXhSCY5BJ3DovtEEmUXx7F9O7+nUvcCfD2Dfoy5s
Q+tf74XMG/QZmESz9tzif6xQE5wr2L2BWlMFOTTwX7Q27KoQlRUZiUltYUdgt2Q+
7jL2LOx9aaOG1+C1+wAm2CKipSgAKYc/m9OD+HMPAGwPXomdficgmNstwVVM75qt
+IcAEu6KAoU0IAOtcXBbR/b+16CJQYz6mz90MPcMyWIiQ0RlaOIeeMYkhLn24loG
5Ahtq8t3dtivxtOsNnbFG644tfkyvGRLA1K7cwIDAQABAoIBABrt0IZBi0FcjU6C
qCGSCH3QRV8YRu9pF/LXCWSILKwnWACxfrRuFYUcXndtqgc/B1xe+ePjqDq/y3pu
MpN5frB3hHaA5oFcffC+04jOLRdtMHIjAadrQ5zpSDnTpUZ02EhX+DhA1rrDmeUj
7yoNc5ZYn2+q7AttEQAI3f4B84flg2BxygUFqYu7w/gdwsOCx6E3WzIxxYM9hKMn
ySITs68Fm3zSIOvC4fthFoAI3ygrPdzdqJfouE3M9gds+B1vDUxnHGbOeo+8jNIB
o7u1d8uIEnx5HeiImgDp1YWdG6bRHAsv7gYP+urC4tE5ebs5iYw/2YY1lnN2uNGy
H32p0YECgYEA6rOJmOz6w9h3nHLHP4MUOQ+MdMWTrrXIkZd3sgjUHSqZU0pMwFoj
H6TaZeQz6iYhSSyhKOXvtvGU/4ibqiqDzcFs/K2j2tK/FG/wIAj4+3kjw7NoUzSl
MNEupJNP+uO6QxvzHwcJOWUkrwdjI78YN7v6pgs4i56nSytiuV4EXUECgYEAxZPk
CvWWgom1Vv712P6F1H7N1dGUnBiz9nLVqTgrGojD4pZrCnENxEk0S+ZNyq+2tQMF
Jc9RagNjlSJCC80BQqDXcUKscNDnv20LjvEmZwjqENDvUKEywNYiqWPobUNwWRdb
Vsw09sW5UW6IJqsGqSp+Elhzc6Au7LtPk0fIx7MCgYBDvuEX0Eet4jzcXtEehxJ+
Sfur9R/kzToAtGzradr4NESfoxG2cA41YxtbT9ygWLNA8O3v5TclYmQ0wlTUcIMt
EAkKgoCKeEyJdKomRRDBXb0yDwYtBkQsbCT/gjoS3Er2dgneSeSiuYw2LXazacRu
ygbWiOSggIIfk31irj2qQQKBgAM5zOlY5SIweWN4Oi9WyHyVrWqmR1TdGmMVsONY
ZWvDe99BMXI0MlNYFqB+nBqJD+SYrgbWAbBHaeLPcmCa8kBSO/I/cm1NG9uGPkAR
M91OyfOIVb/tQdTgKiS12t+d0EHEHdum7d5xj/sCYPqwpCUy6mgGRaxHmzyGOmBf
Nan9AoGAZ4Bx68fhFEFeC6/xJ4NiO/vbsr059lFqlXCucjAruUjK9ki0HnrLaHb5
eXYAFmH9zhZYkzHf3/4MNk0iA/K/23PqH4SQgPEtNSoAhMqeO+I0c+XzJoHWISYb
irPNHM0NjBaCPF+PAaHp3s1CioqxszHHrTGO8c+abpeis4+wGwQ=
-----END RSA PRIVATE KEY-----
 
)KEY";
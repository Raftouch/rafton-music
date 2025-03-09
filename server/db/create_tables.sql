CREATE TABLE artist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL
);

CREATE TABLE genre (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL
);

CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(10) CHECK (role IN ('ADMIN', 'BASIC')) DEFAULT 'BASIC',
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    registeredAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
);

CREATE TABLE song (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    image VARCHAR(255),
    audio VARCHAR(255) NOT NULL,
    playCount INT DEFAULT 0,
    uploadedAt DATE DEFAULT CURRENT_DATE,
    id_user UUID REFERENCES "user" ON DELETE SET NULL,
    id_artist UUID REFERENCES artist(id) ON DELETE CASCADE,
    id_genre UUID REFERENCES genre(id) ON DELETE CASCADE
);

CREATE TABLE favorite (
    id_song UUID REFERENCES song(id) ON DELETE CASCADE,
    id_user UUID REFERENCES "user"(id) ON DELETE CASCADE,
    PRIMARY KEY (id_song, id_user)
);

CREATE TABLE listen (
    id_song UUID REFERENCES song(id) ON DELETE CASCADE,
    id_user UUID REFERENCES "user"(id) ON DELETE CASCADE,
    PRIMARY KEY (id_song, id_user)
);

CREATE TABLE classify (
    id_song UUID REFERENCES song(id) ON DELETE CASCADE,
    id_genre UUID REFERENCES genre(id) ON DELETE CASCADE,
    PRIMARY KEY (id_song, id_genre)
);

CREATE TABLE perform (
    id_artist UUID REFERENCES artist(id) ON DELETE CASCADE,
    id_genre UUID REFERENCES genre(id) ON DELETE CASCADE,
    PRIMARY KEY (id_artist, id_genre)
);

CREATE TABLE create (
    id_artist UUID REFERENCES artist(id) ON DELETE CASCADE,
    id_song UUID REFERENCES song(id) ON DELETE CASCADE,
    PRIMARY KEY (id_artist, id_song)
);

CREATE TABLE song_play_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES "user"(id) ON DELETE CASCADE,
    songId UUID REFERENCES song(id) ON DELETE CASCADE,
    createdAt DATE DEFAULT CURRENT_DATE,
    CONSTRAINT unique_user_song UNIQUE (userId, songId)
);


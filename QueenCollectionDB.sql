SET CHARACTER SET 'utf8';

/* DROP database QueenCollection;
create database QueenCollection;
use QueenCollection; */

CREATE TABLE Artist(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL UNIQUE,
	`group` VARCHAR(100) NOT NULL,  /* for example Queen and Queen+ both belong to Queen group, RT and Cross to RT group etc.*/
    number_in_group INT NOT NULL , /* ordinal number of artist in its group */
	PRIMARY KEY (id)
);

CREATE TABLE Type( /* Studio album, single... */
  id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE Discography_entry(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
  type INT NOT NULL, /* for example album, single...*/
  /* release date of original (first) release, if known. 
    not date, because only year or month can be known 
    format YYYY-MM-DD, where MM and DD are optional 
  */
  release_date VARCHAR(10), 
  artist_id INT NOT NULL, /* artist of the entry, not necessary the same as artist of every track */
	PRIMARY KEY (id),
  UNIQUE KEY entry (name, type, artist_id),
	FOREIGN KEY (artist_id) REFERENCES Artist(id)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (type) REFERENCES Type(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Country(
	id VARCHAR(10), /* UK, US, etc... */
	name VARCHAR(40) NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE Label(
	name VARCHAR(40) NOT NULL, 
	PRIMARY KEY (name)
);


/* Format and Release are reserved keywords in mysql */
CREATE TABLE `Format`(
	id VARCHAR(10), /* LP, CD, etc... */
	description VARCHAR(100) NOT NULL, 
  hasSides BOOL, 
	PRIMARY KEY (id)
);

CREATE TABLE `Release`(
	id INT NOT NULL AUTO_INCREMENT,
  entry_id INT NOT NULL,
	name VARCHAR(100), /* if different from corresponding entry's name*/
  `format` VARCHAR(10) NOT NULL, /* LP, CD...*/
  /* 
    release date, if known
    not date, because only year or month can be known 
    format YYYY-MM-DD, where MM and DD are optional 
  */  
  release_date VARCHAR(10),
  version VARCHAR(100) NOT NULL, /* plain language description */
  country VARCHAR(10), /* if indicated or otherwise known*/
  label VARCHAR(40), /* if indicated */
  discogs_url TEXT,
  cat_number VARCHAR(100), /* if indicated */
  comment TEXT, /* plain language comment, optional */
	PRIMARY KEY (id),
	FOREIGN KEY (entry_id) REFERENCES Discography_entry(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (format) REFERENCES Format(id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (country) REFERENCES Country(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (label) REFERENCES Label(name) ON DELETE CASCADE ON UPDATE CASCADE
);

/* for "box" type releases which contain other releases */
CREATE TABLE Box_entries(
  box_id INT NOT NULL, 
  part_id INT NOT NULL, 
  PRIMARY KEY (box_id, part_id),
  FOREIGN KEY (box_id) REFERENCES `Release`(id),
  FOREIGN KEY (part_id) REFERENCES `Release`(id)
);

CREATE TABLE Composition(
	id INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(100) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE Compositor(
	composition_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY (composition_id, author_id),
  FOREIGN KEY (composition_id) REFERENCES Composition(id),
  FOREIGN KEY (author_id) REFERENCES Artist(id)
);

CREATE TABLE Track(
	id INT NOT NULL AUTO_INCREMENT,
  composition_id INT NOT NULL,
	name VARCHAR(100), /* if different from corresponding composition's id */
  version VARCHAR(100) NOT NULL, /* description */
  comment TEXT, /* optional text */
  length INT, /* in seconds */
	PRIMARY KEY (id),
  FOREIGN KEY (composition_id) REFERENCES Composition(id)
);

CREATE TABLE Track_performer(
	track_id INT NOT NULL,
  performer_id INT NOT NULL,
  PRIMARY KEY (track_id, performer_id),
  FOREIGN KEY (track_id) REFERENCES Track(id),
  FOREIGN KEY (performer_id) REFERENCES Artist(id)
);

CREATE TABLE Release_track(
  release_id INT NOT NULL,
  track_id INT NOT NULL,
  Number VARCHAR(5),
  PRIMARY KEY (release_id, track_id),
  FOREIGN KEY (release_id) REFERENCES `Release`(id) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (track_id) REFERENCES Track(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create view ReleaseView as
select r.id, e.name, format, r.name as alt_name,  r.release_date, version, country, label, cat_number, discogs_url, comment
from Discography_entry as e join `Release` as r on r.entry_id = e.id;

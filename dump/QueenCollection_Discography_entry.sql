-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: QueenCollection
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Discography_entry`
--

DROP TABLE IF EXISTS `Discography_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Discography_entry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `release_date` varchar(10) DEFAULT NULL,
  `artist_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry` (`name`,`type`,`artist_id`),
  KEY `artist_id` (`artist_id`),
  KEY `type` (`type`),
  CONSTRAINT `discography_entry_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `Artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `discography_entry_ibfk_2` FOREIGN KEY (`type`) REFERENCES `Type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Discography_entry`
--

LOCK TABLES `Discography_entry` WRITE;
/*!40000 ALTER TABLE `Discography_entry` DISABLE KEYS */;
INSERT INTO `Discography_entry` VALUES (1,'Queen (Untitled First Album)',1,'1973-07-13',1),(2,'Queen II',1,'1974-03-08',1),(3,'Sheer Heart Attack',1,'1974-11-08',1),(4,'A Night At The Opera',1,'1975-11-21',1),(5,'A Day At The Races',1,'1976-12-10',1),(6,'News Of The World',1,'1977-10-28',1),(7,'Jazz',1,'1978-11-10',1),(8,'Live Killers',3,'1979-06-22',1),(9,'The Game',1,'1980-06-30',1),(10,'Flash Gordon',2,'1980-12-08',1),(11,'Greatest Hits',4,'1981-11-02',1),(12,'Hot Space',1,'1982-05-21',1),(13,'The Works',1,'1984-02-27',1),(14,'A Kind Of Magic',1,'1986-06-02',1),(15,'Live Magic',3,'1986-12-01',1),(16,'The Miracle',1,'1989-05-22',1),(17,'At The Beep/At The BBC',4,'1989-12-04',1),(18,'Innuendo',1,'1991-02-04',1),(19,'Greatest Hits II',4,'1991-10-28',1),(20,'Classic Queen',4,'1992-03-02',1),(21,'Live At Wembley\'86/Live At Wembley Stadium',3,'1992-05-26',1),(22,'Made In Heaven',1,'1995-11-06',1),(23,'Queen Rocks',4,'1997-11-03',1),(24,'Greatest Hits III',4,'1999-11-08',2),(25,'Queen On Fire Live At The Bowl',3,'2004-10-25',1),(26,'Rock Montreal',3,'2007-10-29',1),(27,'Deep Cuts Volume 1 (1973-1976)',4,'2011-03-14',1),(28,'Deep Cuts Volume 2 (1977-1982)',4,'2011-06-27',1),(29,'Deep Cuts Volume 3 (1984-1995)',4,'2011-09-05',1),(30,'Hungarian Rhapsody Live In Budapest',3,'2012-11-05',1),(31,'Live At The Rainbow\'74',3,'2014-09-08',1),(32,'Forever',4,'2014-11-10',1),(33,'A Night At The Odeon',3,'2015-11-20',1),(34,'On Air',4,'2016-11-04',1),(35,'Queen (Untitled East German Compilation)',4,'1981',1),(36,'Golden Collection, Vol. 2',4,'1984',1),(37,'Live',3,'1984',1),(38,'Concerts For The People Of Kampuchea',3,'1981-03-30',3),(39,'By Appointment Only',5,'1993',1),(40,'Keep Yourself Alive',6,'1973-07-06',1),(41,'Liar',6,'1974-02-14',1),(42,'Seven Seas Of Rhye',6,'1974-02-23',1),(43,'Killer Queen',6,'1974-10-11',1),(44,'Now I\'m Here',6,'1975-01-17',1),(45,'Bohemian Rhapsody',6,'1975-10-31',1),(46,'You\'re My Best Friend',6,'1976-06-18',1),(47,'Somebody To Love',6,'1976-11-12',1),(48,'Tie Your Mother Down',6,'1977-03-04',1),(49,'Teo Torriatte (Let Us Cling Together)',6,'1977-03-25',1),(50,'Queen\'s First E.P.',7,'1977-05-20',1),(51,'Long Away',6,'1977-06-07',1),(52,'We Are The Champions',6,'1977-10-07',1),(53,'Spread Your Wings',6,'1978-02-10',1),(54,'It\'s Late',6,'1978-02-07',1),(55,'Bicycle Race',6,'1978-10-13',1),(56,'Don\'t Stop Me Now',6,'1979-01-26',1),(57,'Jealousy',6,'1979-04-27',1),(58,'Mustapha',6,'1979-05',1),(59,'Love Of My Life',6,'1979-06-29',1),(60,'We Will Rock You',6,'1979-08-24',1),(61,'Crazy Little Thing Called Love',6,'1979-10-05',1),(62,'Save Me',6,'1980-01-25',1),(66,'Play The Game',6,'1980-05-30',1),(67,'Another One Bites The Dust',6,'1980-08-22',1),(68,'Need Your Loving Tonight',6,'1980-11-18',1),(69,'Flash',6,'1980-11-24',1),(70,'Under Pressure',6,'1981-10-26',4),(71,'Body Language',6,'1982-04-19',1),(72,'Las Palabras De Amor (The Words Of Love)',6,'1982-06-01',1),(73,'Calling All Girls',6,'1982-07-19',1),(74,'Staying Power',6,'1982-07',1),(75,'Back Chat',6,'1982-08-09',1),(76,'Radio Ga Ga',6,'1984-01-23',1),(77,'I Want To Break Free',6,'1984-04-02',1),(78,'It\'s A Hard Life',6,'1984-07-16',1),(79,'Hammer To Fall',6,'1984-10-10',1),(80,'Thank God It\'s Christmas',6,'1984-11-26',1),(81,'One Vision',6,'1985-11-04',1),(82,'Princes Of The Universe',6,'1986-03-12',1),(83,'A Kind Of Magic',6,'1986-03-17',1),(84,'Friends Will Be Friends',6,'1986-06-09',1),(85,'Pain Is So Close To Pleasure',6,'1986-08-26',1),(86,'Who Wants To Live Forever',6,'1986-09-15',1),(87,'One Year Of Love',6,'1986-09',1),(88,'I Want It All',6,'1989-05-02',1),(89,'Breakthru',6,'1989-06-19',1),(90,'The Invisible Man',6,'1989-08-07',1),(91,'Scandal',6,'1989-10-09',1),(92,'The Miracle',6,'1989-11-27',1),(93,'Innuendo',6,'1991-01-14',1),(94,'I\'m Going Slightly Mad',6,'1991-03-04',1),(95,'Headlong',6,'1991-05-13',1),(96,'These Are The Days Of Our Lives',6,'1991-09-05',1),(97,'The Show Must Go On',6,'1991-10-14',1),(98,'\"We Will Rock You\" and \"We Are The Champions\" (Ruined By Rick Rubin)',6,'1991',1),(99,'Bohemian Rhapsody/These Are The Days Of Our Lives',6,'1991-12-09',1),(100,'We Will Rock You/We Are The Champions (Live At Wembley\'86)',6,'1992-05',1),(103,'Five Live',7,'1993-04-19',5),(104,'Heaven For Everyone',6,'1995-10-23',1),(105,'A Winter\'s Tale',6,'1995-12-11',1),(106,'Too Much Love Will Kill You',6,'1996-02-26',1),(107,'I Was Born To Love You',6,'1996-02-28',1),(108,'Let Me Live',6,'1996-06-17',1),(109,'You Don\'t Fool Me',6,'1996-02-26',1),(110,'No-one But You (Only The Good Die Young)',6,'1997',1),(111,'Another One Bites The Dust',6,'1998-11-14',6),(112,'Under Pressure (Rah Mix)',6,'1999-12-06',4),(113,'Let Me In Your Heart Again',6,'2014-11-03',1),(114,'Fun In Space',1,'1981-04-06',7),(115,'Strange Frontier',1,'1984-06-25',7),(116,'Happiness?',1,'1994-09-09',7),(117,'Electric Fire',1,'1998-09-28',7),(118,'Fun On Earth',1,'2013-11-11',7),(119,'Solo Singles 1',1,'2013-11-11',7),(120,'Solo Singles 2',1,'2013-11-11',7),(121,'Best',1,'2014-10-27',7),(122,'I Wanna Testify',6,'1977-09-26',7),(123,'Future Management',6,'1981-03-30',7),(124,'Let\'s Get Crazy',6,'1981-05-15',7),(125,'My Country',6,'1981-06-29',7),(126,'Man On Fire',6,'1984-06-04',7),(127,'Strange Frontier',6,'1984-07-30',7),(128,'Beautiful Dreams',6,'1984-08',7),(129,'Nazis 1994',6,'1994-05-03',7),(130,'Foreign Sand',6,'1994-09-19',9),(131,'Happiness',6,'1994-11-14',7),(132,'Pressure On',6,'1998-09-28',7),(133,'Surrender',6,'1999-03-29',7),(134,'Woman You\'re So Beautiful (But Still A Pain In The Ass...)',6,'2006-08-10',10),(135,'The Unblinking Eye',6,'2009-11-23',7),(136,'Dear Mr. Murdoch',6,'2011-07-20',7),(137,'Journey\'s End',9,'2017-05-05',7),(138,'Journey\'s End',6,'2017-06-02',7),(139,'Two Sharp Pencils (Get Bad)',6,'2017-07-25',7),(140,'Shove It',1,'1988-01-25',8),(141,'Mad Bad And Dangerous To Know',1,'1990-03-26',8),(142,'Bootleg Astoria Theatre, Dec 1990',3,'1991',8),(143,'Blue Rock',1,'1991-09-09',8),(144,'Live In Germany',3,'1992',8),(145,'Singles 1',4,'2013-11-11',8),(149,'Singles 2',4,'2013-11-11',8),(150,'Cowboys And Indians',6,'1987-09-21',8),(151,'Shove It',6,'1988-01-03',8),(152,'Heaven For Everyone',6,'1988-03-28',8),(153,'Manipulator',6,'1988-07-04',8),(154,'Power To Love',6,'1990-01-29',8),(155,'Liar',6,'1990-08-06',8),(156,'Final Destination',6,'1990-11-26',8),(157,'New Dark Ages',6,'1991-08-09',8),(158,'Life Changes',6,'1991-10-21',8),(159,'Starfleet Project',10,'1983-10-31',12),(160,'Back To The Light',1,'1992-09-21',11),(161,'Live At The Brixton Academy',3,'1994-02-07',13),(162,'Another World',1,'1998-06-01',11),(163,'Red Special',10,'1998-10-28',11),(164,'La Musique De Furia',2,'2000-11-20',11),(165,'Starfleet Project',6,NULL,12),(166,'Driven By You',6,'1991-11-25',11),(167,'Too Much Love Will Kill You',6,'1992-08-24',11),(168,'Back To The Light',6,'1992-11-09',11),(169,'Resurrection',6,'1993-06-07',14),(170,'Last Horizon',6,'1993-12-06',11),(171,'The Amazing Spider-man (Mastermix)',6,'1995-03-04',15),(172,'\"The Business\" (Rock On Cozy Mix)',6,'1998-05-25',11),(173,'On May Way Up',6,'1998-06',11),(174,'Another World',6,'1998-08',11),(175,'Why Don\'t We Try Again',6,'1998-08-31',11),(176,'Save The Badger Badger Badger',6,'2013-05-19',16),(177,'One Night In Hell',6,'2014-11-03',17);
/*!40000 ALTER TABLE `Discography_entry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-26 23:20:20

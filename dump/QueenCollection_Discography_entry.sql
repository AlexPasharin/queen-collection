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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Discography_entry`
--

LOCK TABLES `Discography_entry` WRITE;
/*!40000 ALTER TABLE `Discography_entry` DISABLE KEYS */;
INSERT INTO `Discography_entry` VALUES (1,'Queen (Untitled First Album)',1,'1973-07-13',1),(2,'Queen II',1,'1974-03-08',1),(3,'Sheer Heart Attack',1,'1974-11-08',1),(4,'A Night At The Opera',1,'1975-11-21',1),(5,'A Day At The Races',1,'1976-12-10',1),(6,'News Of The World',1,'1977-10-28',1),(7,'Jazz',1,'1978-11-10',1),(8,'Live Killers',3,'1979-06-22',1),(9,'The Game',1,'1980-06-30',1),(10,'Flash Gordon',2,'1980-12-08',1),(11,'Greatest Hits',4,'1981-11-02',1),(12,'Hot Space',1,'1982-05-21',1),(13,'The Works',1,'1984-02-27',1),(14,'A Kind Of Magic',1,'1986-06-02',1),(15,'Live Magic',3,'1986-12-01',1),(16,'The Miracle',1,'1989-05-22',1),(17,'At The Beep/At The BBC',4,'1989-12-04',1),(18,'Innuendo',1,'1991-02-04',1),(19,'Greatest Hits II',4,'1991-10-28',1),(20,'Classic Queen',4,'1992-03-02',1),(21,'Live At Wembley\'86/Live At Wembley Stadium',3,'1992-05-26',1),(22,'Made In Heaven',1,'1995-11-06',1),(23,'Queen Rocks',4,'1997-11-03',1),(24,'Greatest Hits III',4,'1999-11-08',2),(25,'Queen On Fire Live At The Bowl',3,'2004-10-25',1),(26,'Rock Montreal',3,'2007-10-29',1),(27,'Deep Cuts Volume 1 (1973-1976)',4,'2011-03-14',1),(28,'Deep Cuts Volume 2 (1977-1982)',4,'2011-06-27',1),(29,'Deep Cuts Volume 3 (1984-1995)',4,'2011-09-05',1),(30,'Hungarian Rhapsody Live In Budapest',3,'2012-11-05',1),(31,'Live At The Rainbow\'74',3,'2014-09-08',1),(32,'Forever',4,'2014-11-10',1),(33,'A Night At The Odeon',3,'2015-11-20',1),(34,'On Air',4,'2016-11-04',1),(35,'Queen (Untitled East German Compilation)',4,'1981',1),(36,'Golden Collection, Vol. 2',4,'1984',1),(37,'Live',3,'1984',1),(38,'Concerts For The People Of Kampuchea',3,'1981-03-30',3),(39,'By Appointment Only',5,'1993',1);
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

-- Dump completed on 2018-05-13 23:40:38

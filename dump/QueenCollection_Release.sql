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
-- Table structure for table `Release`
--

DROP TABLE IF EXISTS `Release`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Release` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `format` varchar(10) NOT NULL,
  `release_date` varchar(10) DEFAULT NULL,
  `version` varchar(100) NOT NULL,
  `country` varchar(10) DEFAULT NULL,
  `label` varchar(40) DEFAULT NULL,
  `cat_number` varchar(100) DEFAULT NULL,
  `comment` text,
  `discogs_url` varchar(100) DEFAULT NULL,
  `condition_problems` text,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `format` (`format`),
  KEY `country` (`country`),
  KEY `label` (`label`),
  CONSTRAINT `release_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `Discography_entry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `release_ibfk_2` FOREIGN KEY (`format`) REFERENCES `Format` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `release_ibfk_3` FOREIGN KEY (`country`) REFERENCES `Country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `release_ibfk_4` FOREIGN KEY (`label`) REFERENCES `Label` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Release`
--

LOCK TABLES `Release` WRITE;
/*!40000 ALTER TABLE `Release` DISABLE KEYS */;
INSERT INTO `Release` VALUES (1,1,'Queen','LP','1973-07-13','Original UK LP','UK','EMI','EMC 3006','Matrix / Runout: YAX 4623-3U KIP - HUGGYPOO KISSY (Side A), YAX 4624-3U AGAIN! (Side B), variant 1 in discogs.\nMy copy contains ANOTR inner sleeve.','https://www.discogs.com/Queen-Queen/release/847206',NULL),(2,1,'Queen','LP','1973','Original Japanese LP','JAP','Electra','P-8427E','Red sleeve, insert with lyrics. No OBI on my copy.','https://www.discogs.com/Queen-Queen/release/499786',NULL),(3,2,NULL,'LP','1974-03-08','Original UK LP','UK','EMI','EMA 767','1st pressing with 3 die-cut corners on inner sleeve.','https://www.discogs.com/Queen-Queen-II/release/7499354',NULL),(4,3,NULL,'LP','1974-11-08','Original UK LP','UK','EMI','EMC 3061','Matrix / Runout: YAX 4881-3U ROA TML-S (Side A), YAX 4882-4U RAM (Side B), variant 4 on discogs.','https://www.discogs.com/Queen-Sheer-Heart-Attack/release/777747',NULL),(5,4,NULL,'LP','1975-11-21','Original UK LP','UK','EMI','EMTC 103','3 die-cut corner picture inner sleeve.','https://www.discogs.com/Queen-A-Night-At-The-Opera/release/3605090',NULL),(6,5,NULL,'LP','1976-12-10','Original UK LP','UK','EMI','EMTC 104','Matrix / Runout: YAX 5245 - 1U STERLING (Side A), YAX 5246 - 1U STERLING (Side B), variant 1 in discogs.','https://www.discogs.com/Queen-A-Day-At-The-Races/release/475596',NULL),(7,6,NULL,'LP','1977-10-28','Original UK LP','UK','EMI','EMA 784','Matrix / Runout: YAX 5355 - 5 - 1 - 1 -2 (Side A), YAX 5356 - 3 NICK W (Side B), variation 8 on discogs.','https://www.discogs.com/Queen-News-Of-The-World/release/475599',NULL),(8,8,NULL,'LP','1979-06-22','Original UK LP','UK','EMI','EMSP 330',NULL,'https://www.discogs.com/Queen-Live-Killers/release/511686',NULL),(9,9,NULL,'LP','1980-07-01','Original US LP, glossy version','US','Electra','5E-513','SP release with glossy sleeve.','https://www.discogs.com/Queen-The-Game/release/8310337',NULL),(10,10,NULL,'LP','1981-01-27','Original UK LP','US','Electra','5E-518','An embossed cover, a cardboard insert and a custom photo inner sleeve.','https://www.discogs.com/Queen-Flash-Gordon-Original-Soundtrack-Music/release/1106103',NULL),(11,35,'Queen','LP','1981','Crest sleeve, red labels','GDR','Amiga','8 55 787','Crest sleeve, 1st pressing, because it has red labels.','https://www.discogs.com/Queen-Queen/release/414950',NULL),(12,11,NULL,'LP','1981','German LP, brown/gold relief sleeve with sticker, no UP','GER','EMI','1C 088-78 044','Brown/gold relief sleeve with sticker. Contains \"Spread Your Wings\" after YMBF, but not \"Under Pressure\"','https://www.discogs.com/Queen-Greatest-Hits/release/4018700',NULL),(13,11,'Grootste Hits','LP','1981','Dutch LP, later re-pressing with UP','HOL','EMI','1A 058-15 4107 1','Later re-pressing with \"Under Pressure\" added as a last track on Side A. Record itself states \"made in EEC\" and record label has text in German.\nArticle on band in Dutch on back side.','https://www.discogs.com/Queen-Grootste-Hits/release/1985326',NULL),(14,11,NULL,'LP','1983','Bulgarian original 2LP release with orange labels','BUL','Balkanton','BTA 11253/54',NULL,'https://www.discogs.com/Queen-Greatest-Hits/release/7250794','A side is ruined'),(15,11,NULL,'LP','1986','Bulgarian 1LP re-issue with green labels','BUL','Balkanton','BTA 11843','Green labels and white background on tracklisting on back','https://www.discogs.com/Queen-Greatest-Hits/release/3868243',NULL),(16,11,NULL,'LP','1987','Bulgarian 1LP re-issue with blue labels and yellow back','BUL','Balkanton','BTA 11843','Blue labels and yellow background on tracklisting on back.','https://www.discogs.com/Queen-Greatest-Hits/release/2911527',NULL),(17,11,NULL,'LP','1990','USSR LP','USSR','Melodia','A60 00703 001','Pink tracklisting, made in Leningrad as indicated on label.','https://www.discogs.com/Queen-Greatest-Hits/release/2107163',NULL),(18,36,NULL,'LP','1984','Cat. number is GC008','HOL',NULL,'GC008','Record label not indicated, records itself are American Electra releases of \"Hot Space\" (SP edition) and \"The Game\" (AR edition).','https://www.discogs.com/Queen-Golden-Collection-Vol-2/release/5309577',NULL),(19,12,NULL,'LP','1984','Czechoslovakian LP','CZS','EMI Supraphon','1113 3509',NULL,'https://www.discogs.com/Queen-Hot-Space/release/2610224',NULL),(20,13,NULL,'LP','1984','Dutch LP','HOL','EMI','1C 064 2400141','Country and cat.number from sleeve. The record itself is a German \"made in EEC\" release with cat.number 1A 064-2400141.','https://www.discogs.com/Queen-The-Works/release/1838765',NULL),(21,37,NULL,'LP','1984','South Arfrican LP','SA','EMI','EXTRA 5',NULL,'https://www.discogs.com/Queen-Live/release/3391199',NULL),(22,15,NULL,'LP','1986','Dutch LP','HOL','EMI','062 24 0675 1','Printed in Holland, record itself \"made in EEC\". Matrix/runout: 2406751-A2 (side A), 2406751-B1 (side B), variant 2 on discogs.','https://www.discogs.com/Queen-Live-Magic/release/586463',NULL),(23,16,NULL,'LP','1989','Dutch LP','HOL','Parlophone','064 7 92357 1',NULL,'https://www.discogs.com/Queen-The-Miracle/release/475618','Discount hole punched in sleeve'),(24,18,NULL,'LP','1991','European LP, French distrubution code on back','EEC','EMI Parlophone','068 7 95887 1','Matrix / Runout: 7958871-A2 1 (Side A), 7958871-B2 2 (Side B), this variant is not on discogs.','https://www.discogs.com/Queen-Innuendo/release/5383773',NULL),(25,18,NULL,'LP','2009-08-31','US 2009 re-issue on 180 gramm vinyl','US','Hollywood Records','D000436701',NULL,'https://www.discogs.com/Queen-Innuendo/release/3256694',NULL),(26,19,NULL,'LP','1991','European original 2LP, PMTV 2 version','EEC','Parlophone','168 7 97971 1','Verson with PMTV 2 text on back.','https://www.discogs.com/Queen-Greatest-Hits-II/release/2847310',NULL),(27,21,'Live At Wembley\'86','LP','1992','Original Italian 2LP','ITA','Parlophone','2-72 7995941',NULL,'https://www.discogs.com/Queen-Live-At-Wembley-86/release/2009855',NULL),(28,22,NULL,'LP','1995-11-06','UK original ivory vinyl LP, promo copy','ITA','Parlophone','PCSD 167','Promo copy. No \'Queen discography\' paper at least on my copy.','https://www.discogs.com/Queen-Made-In-Heaven/release/803525','Inside of gatefold and posters slightly ruined.'),(29,23,NULL,'LP','1997-11-03','UK 2LP, crest sleeve, clear sticker.','UK','Parlophone','823 0911',NULL,'https://www.discogs.com/Queen-Queen-Rocks/release/1457494',NULL),(30,24,NULL,'LP','1999-11-08','Original LP','EU','Parlophone','7243 5 23452 1 2','Numbered edition with picture PVC sleeve, my copy is number 06485.','https://www.discogs.com/Queen-Greatest-Hits-III/release/586935',NULL),(31,31,NULL,'LP','2014-09-08','Original 2LP edition','EU','Virgin EMI Records','0602537910717',NULL,'https://www.discogs.com/Queen-Live-At-The-Rainbow-74/release/6055943',NULL),(32,31,NULL,'LP','2014-09-08','Original 4LP Box','EU','Virgin EMI Records','0602537910748',NULL,'https://www.discogs.com/Queen-Live-At-The-Rainbow-74/release/6055344',NULL),(33,32,NULL,'LP','2015-04-13','4LP Box','EU','Virgin EMI Records','0602547190635',NULL,'https://www.discogs.com/Queen-Queen-Forever/release/6885034',NULL),(34,33,NULL,'LP','2015-11-20','Original 2LP','UK','Virgin EMI Records','0602547500748','Matrix / Runout codes as in variant 2 on discogs.','https://www.discogs.com/Queen-A-Night-At-The-Odeon/release/7739371',NULL),(35,38,NULL,'LP','1981','German 2LP','GER','Atlantic','ATL 60 153','Contains Queen\'s \'Now I\'m Here\' live at Hammersmith Odeon 26 Dec 1979 as a first track on side 3.','https://www.discogs.com/Various-Concerts-For-The-People-Of-Kampuchea/release/1624120','Discount cuts in sleeve.'),(36,39,NULL,'LP','1993','1993 bootleg LP',NULL,NULL,NULL,'No label or cat.number. Place of manifacture unknown. Contains audience recording of gig at Cologne, Germany, February 1st, 1979.','https://www.discogs.com/Queen-By-Appointment-Only/release/2095200',NULL);
/*!40000 ALTER TABLE `Release` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-13 23:40:37

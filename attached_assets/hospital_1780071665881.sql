/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `hospital` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `hospital`;

CREATE TABLE IF NOT EXISTS `appointment` (
  `appointmentid` int(11) NOT NULL AUTO_INCREMENT,
  `doctor` int(11) DEFAULT NULL,
  `appointmentdate` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('Scheduled','Completed','Canceled') DEFAULT NULL,
  `user` int(10) DEFAULT NULL,
  `mobileno` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`appointmentid`),
  KEY `appointmentuser_fk` (`user`),
  KEY `appoinment_fk` (`doctor`),
  CONSTRAINT `appoinment_fk` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointmentuser_fk` FOREIGN KEY (`user`) REFERENCES `user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `casestudies` (
  `casestudyid` int(11) NOT NULL AUTO_INCREMENT,
  `treatmentid` int(11) DEFAULT NULL,
  `title` mediumtext DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `result` mediumtext DEFAULT NULL,
  `dateofcase` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`casestudyid`),
  KEY `treatment_fk` (`treatmentid`),
  CONSTRAINT `treatment_fk` FOREIGN KEY (`treatmentid`) REFERENCES `treatment` (`treatmentid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `casestudies_images` (
  `imgid` int(11) NOT NULL AUTO_INCREMENT,
  `image` longblob DEFAULT NULL,
  `casestudy` int(10) DEFAULT NULL,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` mediumtext DEFAULT NULL,
  PRIMARY KEY (`imgid`),
  KEY `case_imgfk` (`casestudy`),
  CONSTRAINT `case_imgfk` FOREIGN KEY (`casestudy`) REFERENCES `casestudies` (`casestudyid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `disease` (
  `diseaseid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  PRIMARY KEY (`diseaseid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `diseaseimages` (
  `diseaseimageid` int(11) NOT NULL AUTO_INCREMENT,
  `image` longblob DEFAULT NULL,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` varchar(12) DEFAULT NULL,
  `disease` int(10) DEFAULT NULL,
  PRIMARY KEY (`diseaseimageid`),
  KEY `disease` (`disease`),
  CONSTRAINT `disease` FOREIGN KEY (`disease`) REFERENCES `disease` (`diseaseid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `doctor` (
  `doctorid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(22) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `schedulefrom` varchar(10) DEFAULT NULL,
  `scheduleto` varchar(10) DEFAULT NULL,
  `joindate` timestamp NULL DEFAULT current_timestamp(),
  `resigndate` timestamp NULL DEFAULT current_timestamp(),
  `profilephotot` longblob DEFAULT NULL,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` mediumtext DEFAULT NULL,
  `doctor` mediumtext DEFAULT NULL,
  `about` mediumtext DEFAULT NULL,
  PRIMARY KEY (`doctorid`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `doctor_speacialization` (
  `doctorspeacializationid` int(11) NOT NULL AUTO_INCREMENT,
  `doctor` int(10) DEFAULT NULL,
  `speacialization` int(10) DEFAULT NULL,
  PRIMARY KEY (`doctorspeacializationid`),
  KEY `doc_fk` (`doctor`),
  KEY `speacialization_fk` (`speacialization`),
  CONSTRAINT `doc_fk` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE,
  CONSTRAINT `speacialization_fk` FOREIGN KEY (`speacialization`) REFERENCES `speacialization` (`speacializationid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `education` (
  `educationid` int(11) NOT NULL AUTO_INCREMENT,
  `degree` varchar(20) DEFAULT NULL,
  `universityname` varchar(40) DEFAULT NULL,
  `fromdate` date DEFAULT NULL,
  `todate` date DEFAULT NULL,
  `doctor` int(10) DEFAULT NULL,
  PRIMARY KEY (`educationid`),
  KEY `fk_doctorid` (`doctor`),
  CONSTRAINT `fk_doctorid` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `experience` (
  `experienceid` int(11) NOT NULL AUTO_INCREMENT,
  `field` varchar(40) DEFAULT NULL,
  `hospitalname` varchar(40) DEFAULT NULL,
  `years` int(11) DEFAULT NULL,
  `fromdate` date DEFAULT NULL,
  `todate` date DEFAULT NULL,
  `doctor` int(10) DEFAULT NULL,
  PRIMARY KEY (`experienceid`),
  KEY `fk_docid` (`doctor`),
  CONSTRAINT `fk_docid` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `facilites` (
  `facilitesid` int(11) NOT NULL AUTO_INCREMENT,
  `facilityname` varchar(30) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `availability` enum('yes','no') DEFAULT NULL,
  `facilitytype` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`facilitesid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `facilites_images` (
  `imgid` int(11) NOT NULL AUTO_INCREMENT,
  `image` longblob DEFAULT NULL,
  `facility` int(10) DEFAULT NULL,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` mediumtext DEFAULT NULL,
  PRIMARY KEY (`imgid`),
  KEY `fac_fk` (`facility`),
  CONSTRAINT `fac_fk` FOREIGN KEY (`facility`) REFERENCES `facilites` (`facilitesid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `faquestion` (
  `faquestionid` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `question` varchar(60) DEFAULT NULL,
  `answer` varchar(80) DEFAULT NULL,
  `creatat` timestamp NULL DEFAULT current_timestamp(),
  `answerat` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`faquestionid`),
  KEY `user_fk` (`user`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user`) REFERENCES `user` (`userid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `media` (
  `mediaid` int(11) NOT NULL AUTO_INCREMENT,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` varchar(15) DEFAULT NULL,
  `image` longblob DEFAULT NULL,
  PRIMARY KEY (`mediaid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `news` (
  `newsid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `newsdate` timestamp NULL DEFAULT current_timestamp(),
  `newstype` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`newsid`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `newsimage` (
  `newsid` int(11) DEFAULT NULL,
  `image` longblob DEFAULT NULL,
  `news` int(11) NOT NULL AUTO_INCREMENT,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` mediumtext DEFAULT NULL,
  PRIMARY KEY (`news`),
  KEY `img_fk` (`newsid`),
  CONSTRAINT `img_fk` FOREIGN KEY (`newsid`) REFERENCES `news` (`newsid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `patient` (
  `patientid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `age` int(4) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `phoneno` int(10) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`patientid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `review` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `reviewdescription` varchar(50) DEFAULT NULL,
  `patient` int(10) DEFAULT NULL,
  PRIMARY KEY (`reviewid`),
  KEY `patient_reviewfk` (`patient`),
  CONSTRAINT `patient_reviewfk` FOREIGN KEY (`patient`) REFERENCES `patient` (`patientid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `section` (
  `sectionid` int(11) NOT NULL AUTO_INCREMENT,
  `heading` mediumtext DEFAULT NULL,
  `content` mediumtext DEFAULT NULL,
  `imgvid` longblob DEFAULT NULL,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` mediumtext DEFAULT NULL,
  PRIMARY KEY (`sectionid`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `speacialization` (
  `speacializationid` int(11) NOT NULL AUTO_INCREMENT,
  `fieldname` varchar(50) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  PRIMARY KEY (`speacializationid`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `subspeacialization` (
  `subspeacializationid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `speacialization` int(10) DEFAULT NULL,
  PRIMARY KEY (`subspeacializationid`),
  KEY `subspeacialization_fk` (`speacialization`),
  CONSTRAINT `subspeacialization_fk` FOREIGN KEY (`speacialization`) REFERENCES `speacialization` (`speacializationid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `subspeacializationimagesvideo` (
  `subspeacializationimagesid` int(11) NOT NULL AUTO_INCREMENT,
  `subspeacialization` int(10) DEFAULT NULL,
  `imagevideo` longblob DEFAULT NULL,
  `imagename` mediumtext DEFAULT NULL,
  `imagetype` mediumtext DEFAULT NULL,
  PRIMARY KEY (`subspeacializationimagesid`),
  KEY `subspeacializationimages_fk` (`subspeacialization`),
  CONSTRAINT `subspeacializationimages_fk` FOREIGN KEY (`subspeacialization`) REFERENCES `subspeacialization` (`subspeacializationid`)
) ENGINE=InnoDB AUTO_INCREMENT=397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `treatment` (
  `treatmentid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `tratmentdate` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`treatmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `treatmentdoctor` (
  `treatmentdoctorid` int(11) NOT NULL AUTO_INCREMENT,
  `doctor` int(10) DEFAULT NULL,
  `treatment` int(10) DEFAULT NULL,
  PRIMARY KEY (`treatmentdoctorid`),
  KEY `doctortreatment` (`doctor`),
  KEY `treatmenttreatment` (`treatment`),
  CONSTRAINT `doctortreatment` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `treatmenttreatment` FOREIGN KEY (`treatment`) REFERENCES `treatment` (`treatmentid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `hashedpassword` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `role` enum('Admin','Visitor') DEFAULT NULL,
  `createat` timestamp NULL DEFAULT current_timestamp(),
  `updateat` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

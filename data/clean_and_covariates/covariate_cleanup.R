## first, download all participant files into the project directory ##
## clean up the prolific body image data and force everything together ##
library(dplyr)
library(tidyverse)
library(plyr)
library(stringr)

# Covariate variables calculated so far: 
# 1. BMI, classification, participant rated BMI, discrepancy between objective and subjective ratings
# 2. Age, weight, height, ethnicity
# 3. Whether or not they failed check questions, mental health issues, etc
# 4. BSQR score and classification
# 5. EDEQ score and classifications
# 6. BSI global severity index, somatic score, anxiety and depression sub-scores
# 7. Need for cognition score
# 8. Kirby scores
# 9. Screen time in MINUTES
# 10. Demographics and education
# 11. Prolific variables (nationality, etc)


## Here are all the covariate thingies that are not screentime
{
setwd("~/Desktop/complete_body_image") #or your own directory
#import all the files into one big document, was being cheeky so forcing them all as characters (this might take a moment)
{  
  covariates <-
    list.files(pattern = "*.csv") %>% 
    map_df(~read_csv(., col_types = cols(.default = "c")))
}
#now I only want first line for each participant with demographic variables
cov = subset(covariates, covariates$trial_type == "pavlovia")

#### Prolific Demographics ####
setwd("~/Desktop/body_data/prolific") #or your own directory
#import all the files into one big document, was being cheeky so forcing them all as characters (this might take a moment)
{  
  prolific <-
    list.files(pattern = "*.csv") %>% 
    map_df(~read_csv(., col_types = cols(.default = "c")))
}

prolific_demographics <- prolific[, c(2,7,13,14,15:21)]
names(prolific_demographics)[names(prolific_demographics) == "participant_id"] <- "prolID"

#participant_id
prolific_demographics <- merge(cov, prolific_demographics, by = "prolID")
prolific_demographics <- prolific_demographics[, c(1,6,7,11,12,161:170)]
write.csv(prolific_demographics,"~/Desktop/body_data/prolific_demog.csv", 'row.names' = FALSE)
#12 id needs to be changed/anonymized
covariate_vars[12, 155] = "NA"

#### Ok how about we go ahead and clean thicovariate_vars up? ####
# Let's return to files that only have the correct number of trials
#back to the covariates file
#now I only want first line for each participant with the correct amount of trials
covariate_vars = subset(covariates, covariates$trial_index == "1660") #noice
covariate_vars <- as.data.frame(apply(covariate_vars,2,function(x)gsub('\\s+', '',x)))
# replace some cheeky values
covariate_vars[73, 8] = "Female"
covariate_vars[45, 8] = "Female"
covariate_vars$gender.check <- "NA"
covariate_vars$gender.check <- as.numeric(covariate_vars$gender.check)
covariate_vars$gender.check <- replace(covariate_vars$gender.check,covariate_vars$sex=="female",0)
covariate_vars$gender.check <- replace(covariate_vars$gender.check,covariate_vars$gender=="Female",1)
covariate_vars = subset(covariate_vars, covariate_vars$gender.check >= 0) #noice

########### covariate_vars Status ################ # 14
covariate_vars$marital <- revalue(covariate_vars$marital, c("single"="Single"))  
covariate_vars$marital <- revalue(covariate_vars$marital, c("engaged"="Engaged"))              
covariate_vars$marital <- revalue(covariate_vars$marital, c("divorced"="Divorced"))                   
covariate_vars$marital <- revalue(covariate_vars$marital, c("Single(nevermarried)"="Single"))                   
covariate_vars$marital <- revalue(covariate_vars$marital, c("Single(Nevermarried)"="Single"))                    
covariate_vars$marital <- revalue(covariate_vars$marital, c("single(nevermarried)"="Single")) 
covariate_vars$marital <- revalue(covariate_vars$marital, c("single,nevermarried"="Single"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("SINGLE"="Single"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("SIngle"="Single"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("married"="Married"))
# relationship
covariate_vars$marital <- revalue(covariate_vars$marital, c("CommonLaw"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("Commonlaw"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("coupled"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("Datingexclusively"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("inalong-termrelationship"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("inarelationship"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("Inarelationship"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("Inarelationshipbutnotmarried"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("inrelationship"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("livingwithdomesticpartner"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("Livingwithpartner"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("monogamousrelationship"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("nevermarried"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("Nevermarried,beenwithmypartnerfor6years"="In Relationship"))
covariate_vars$marital <- revalue(covariate_vars$marital, c("Other,nevermarriedbutinalong-termrelationship"="In Relationship"))

covariate_vars$marital <- revalue(covariate_vars$marital, c("other"="Other")) 
covariate_vars$marital <- revalue(covariate_vars$marital, c("Other(engaged)"="Engaged"))

###########################################
##### Make sure people speak english ###
covariate_vars$native_eng_speakers <- grepl("nglish", covariate_vars$natlang, fixed=TRUE)
covariate_vars$secl_eng_speakers <- grepl("nglish", covariate_vars$olang, fixed=TRUE)

covariate_vars$speaks_english ="English Speaker"
for (i in 1:length(covariate_vars$keep)){
  if (covariate_vars$native_eng_speakers[i] == "TRUE"&covariate_vars$secl_eng_speakers[i] == "FALSE"){
    covariate_vars$speaks_english[i] = "English Speaker"}
  else if (covariate_vars$native_eng_speakers[i] == "FALSE"&covariate_vars$secl_eng_speakers[i] == "TRUE"){
    covariate_vars$speaks_english[i] = "English Speaker"}
  else if (covariate_vars$native_eng_speakers[i] == "TRUE"&covariate_vars$secl_eng_speakers[i] == "TRUE"){
    covariate_vars$speaks_english[i] = "English Speaker"}
  else if (covariate_vars$native_eng_speakers[i] == "FALSE"&covariate_vars$secl_eng_speakers[i] == "FALSE"){
    covariate_vars$speaks_english[i] = "Not an English Speaker"}
}
# if they are prolific participants they do speak English

# Clean the covariates
####### KIRBY CLEANUP #######
{ 
  covariate_vars <- covariate_vars %>% mutate(kirby01 = replace(kirby01, kirby01 == "$30tonight", 1)) %>%
    mutate(kirby01 = replace(kirby01, kirby01 == "$85in14days", 0)) %>%
    mutate(kirby02 = replace(kirby02, kirby02 == "$40tonight", 1)) %>%
    mutate(kirby02 = replace(kirby02, kirby02 == "$55in25days", 0)) %>%
    mutate(kirby03 = replace(kirby03, kirby03 == "$67tonight", 1)) %>%
    mutate(kirby03 = replace(kirby03, kirby03 == "$85in35days", 0)) %>%
    mutate(kirby04 = replace(kirby04, kirby04 == "$34tonight", 1)) %>%
    mutate(kirby04 = replace(kirby04, kirby04 == "$35in43days", 0)) %>%
    mutate(kirby05 = replace(kirby05, kirby05 == "$15tonight", 1)) %>%
    mutate(kirby05 = replace(kirby05, kirby05 == "$35in10days", 0)) %>%
    mutate(kirby06 = replace(kirby06, kirby06 == "$32tonight", 1)) %>%
    mutate(kirby06 = replace(kirby06, kirby06 == "$55in20days", 0)) %>%
    mutate(kirby07 = replace(kirby07, kirby07 == "$83tonight", 1)) %>%
    mutate(kirby07 = replace(kirby07, kirby07 == "$85in35days", 0)) %>%
    mutate(kirby08 = replace(kirby08, kirby08 == "$21tonight", 1)) %>%
    mutate(kirby08 = replace(kirby08, kirby08 == "$30in75days", 0)) %>%
    mutate(kirby09 = replace(kirby09, kirby09 == "$48tonight", 1)) %>%
    mutate(kirby09 = replace(kirby09, kirby09 == "$55in45days", 0)) %>%
    mutate(kirby10 = replace(kirby10, kirby10 == "$40tonight", 1)) %>%
    mutate(kirby10 = replace(kirby10, kirby10 == "$65in70days", 0)) %>%
    mutate(kirby11 = replace(kirby11, kirby11 == "$25tonight", 1)) %>%
    mutate(kirby11 = replace(kirby11, kirby11 == "$35in25days", 0)) %>%
    mutate(kirby12 = replace(kirby12, kirby12 == "$65tonight", 1)) %>%
    mutate(kirby12 = replace(kirby12, kirby12 == "$75in50days", 0)) %>%
    mutate(kirby13 = replace(kirby13, kirby13 == "$55in10days", 0)) %>%
    mutate(kirby13 = replace(kirby13, kirby13 == "$24tonight", 1)) %>%
    mutate(kirby14 = replace(kirby14, kirby14 == "$30tonight", 1)) %>%
    mutate(kirby14 = replace(kirby14, kirby14 == "$35in20days", 0)) %>%
    mutate(kirby15 = replace(kirby15, kirby15 == "$53tonight", 1)) %>%
    mutate(kirby15 = replace(kirby15, kirby15 == "$55in55days", 0)) %>%
    mutate(kirby16 = replace(kirby16, kirby16 == "$47tonight", 1)) %>%
    mutate(kirby16 = replace(kirby16, kirby16 == "$60in50days", 0)) %>%
    mutate(kirby17 = replace(kirby17, kirby17 == "$40tonight", 1)) %>%
    mutate(kirby17 = replace(kirby17, kirby17 == "$70in20days", 0)) %>%
    mutate(kirby18 = replace(kirby18, kirby18 == "$50tonight", 1)) %>%
    mutate(kirby18 = replace(kirby18, kirby18 == "$80in70days", 0)) %>%
    mutate(kirby19 = replace(kirby19, kirby19 == "$45tonight", 1)) %>%
    mutate(kirby19 = replace(kirby19, kirby19 == "$70in35days", 0)) %>%
    mutate(kirby20 = replace(kirby20, kirby20 == "$27tonight", 1)) %>%
    mutate(kirby20 = replace(kirby20, kirby20 == "$30in35days", 0)) %>%
    mutate(kirby21 = replace(kirby21, kirby21 == "$16tonight", 1)) %>%
    mutate(kirby21 = replace(kirby21, kirby21 == "$30in35days", 0)) }
########################################
####### ETHNICITY #######
covariate_vars <- covariate_vars %>% mutate(ethnicity = replace(ethnicity, ethnicity == "HispanicorLatinoorSpanishOriginofanyrace", "Hispanic")) %>%
  mutate(ethnicity = replace(ethnicity, ethnicity == "WhiteorCaucasian", "White")) %>%
  mutate(ethnicity = replace(ethnicity, ethnicity == "BlackorAfricanAmerican", "Black")) %>%
  mutate(ethnicity = replace(ethnicity, ethnicity =="Iwouldrathernotanswer", "No Answer")) %>%
  mutate(ethnicity = replace(ethnicity, ethnicity =="AmericanIndianorAlaskanNative", "Native")) %>%
  mutate(ethnicity = replace(ethnicity, ethnicity =="MiddleEasternorNorthAfrican", "Middle-Eastern"))
########################################
#############NEED FOR COGNITION###########################
covariate_vars$ngs_01 <- recode(covariate_vars$ngs_01, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_02 <- recode(covariate_vars$ngs_02, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_03 <- recode(covariate_vars$ngs_03, "0" = 5, "1" = 4, "2" = 3, "3" = 2, "4" = 1) # reverse
covariate_vars$ngs_04 <- recode(covariate_vars$ngs_04, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_05 <- recode(covariate_vars$ngs_05, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_06 <- recode(covariate_vars$ngs_06, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_07 <- recode(covariate_vars$ngs_07, "0" = 5, "1" = 4, "2" = 3, "3" = 2, "4" = 1) # reverse
covariate_vars$ngs_08 <- recode(covariate_vars$ngs_08, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_09 <- recode(covariate_vars$ngs_09, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_10 <- recode(covariate_vars$ngs_10, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_11 <- recode(covariate_vars$ngs_11, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_12 <- recode(covariate_vars$ngs_12, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_13 <- recode(covariate_vars$ngs_13, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_14 <- recode(covariate_vars$ngs_14, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_15 <- recode(covariate_vars$ngs_15, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_16 <- recode(covariate_vars$ngs_16, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_17 <- recode(covariate_vars$ngs_17, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_18 <- recode(covariate_vars$ngs_18, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5)
covariate_vars$ngs_score <- covariate_vars$ngs_01+covariate_vars$ngs_02+covariate_vars$ngs_03+covariate_vars$ngs_04+covariate_vars$ngs_05+covariate_vars$ngs_06+covariate_vars$ngs_07+covariate_vars$ngs_08+covariate_vars$ngs_09+covariate_vars$ngs_10+covariate_vars$ngs_11+covariate_vars$ngs_12+covariate_vars$ngs_13+covariate_vars$ngs_14+covariate_vars$ngs_15+covariate_vars$ngs_16+covariate_vars$ngs_17+covariate_vars$ngs_18
########################################
#############    BSI   ###################
covariate_vars$BSI_1 <- recode(covariate_vars$BSI_1, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_2 <- recode(covariate_vars$BSI_2, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_3 <- recode(covariate_vars$BSI_3, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_4 <- recode(covariate_vars$BSI_4, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_5 <- recode(covariate_vars$BSI_5, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_6 <- recode(covariate_vars$BSI_6, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_7 <- recode(covariate_vars$BSI_7, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_8 <- recode(covariate_vars$BSI_8, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_9 <- recode(covariate_vars$BSI_9, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_10 <- recode(covariate_vars$BSI_10, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_11 <- recode(covariate_vars$BSI_11, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_12 <- recode(covariate_vars$BSI_12, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_13 <- recode(covariate_vars$BSI_13, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_14 <- recode(covariate_vars$BSI_14, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_15 <- recode(covariate_vars$BSI_15, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_16 <- recode(covariate_vars$BSI_16, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_17 <- recode(covariate_vars$BSI_17, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$BSI_18 <- recode(covariate_vars$BSI_18, "0" = 0, "1" = 1, "2" = 2, "3" = 3, "4" = 4)
covariate_vars$global.sev.index <- covariate_vars$BSI_1+covariate_vars$BSI_2+covariate_vars$BSI_3+covariate_vars$BSI_4+covariate_vars$BSI_5+covariate_vars$BSI_6+covariate_vars$BSI_7+covariate_vars$BSI_8+covariate_vars$BSI_9+covariate_vars$BSI_10+covariate_vars$BSI_11+covariate_vars$BSI_12+covariate_vars$BSI_13+covariate_vars$BSI_14+covariate_vars$BSI_15+covariate_vars$BSI_16+covariate_vars$BSI_17+covariate_vars$BSI_18
covariate_vars$somatic <- covariate_vars$BSI_1+covariate_vars$BSI_4+covariate_vars$BSI_7+covariate_vars$BSI_10+covariate_vars$BSI_13+covariate_vars$BSI_16
covariate_vars$anxiety <- covariate_vars$BSI_2+covariate_vars$BSI_5+covariate_vars$BSI_8+covariate_vars$BSI_11+covariate_vars$BSI_14+covariate_vars$BSI_17
covariate_vars$depression <- covariate_vars$BSI_3+covariate_vars$BSI_6+covariate_vars$BSI_9+covariate_vars$BSI_12+covariate_vars$BSI_15+covariate_vars$BSI_18
########################################
######## EDEQ #########
#Above 13 is considered a cutoff point "0 days" = 0, "1 to 2 days" = 1, "3 to 5 days" = 2, "6 to 7 days" = 3
# scores are summed 
covariate_vars$EDEQ_1 <- recode(covariate_vars$EDEQ_1, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_2 <- recode(covariate_vars$EDEQ_2, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_3 <- recode(covariate_vars$EDEQ_3, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_4 <- recode(covariate_vars$EDEQ_4, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_5 <- recode(covariate_vars$EDEQ_5, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_6 <- recode(covariate_vars$EDEQ_6, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_7 <- recode(covariate_vars$EDEQ_7, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_8 <- recode(covariate_vars$EDEQ_8, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_9 <- recode(covariate_vars$EDEQ_9, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_10 <- recode(covariate_vars$EDEQ_10, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_11 <- recode(covariate_vars$EDEQ_11, "0" = 0, "1" = 1, "2" = 2, "3" = 3) #"Not at All" = 0, "Slightly" = 1, "Moderately" = 2, "Markedly" = 3
covariate_vars$EDEQ_12 <- recode(covariate_vars$EDEQ_12, "0" = 0, "1" = 1, "2" = 2, "3" = 3)
covariate_vars$EDEQ_score <- covariate_vars$EDEQ_1+covariate_vars$EDEQ_2+covariate_vars$EDEQ_3+covariate_vars$EDEQ_4+covariate_vars$EDEQ_5+covariate_vars$EDEQ_6+covariate_vars$EDEQ_7+covariate_vars$EDEQ_8+covariate_vars$EDEQ_9+covariate_vars$EDEQ_10+covariate_vars$EDEQ_11+covariate_vars$EDEQ_12 
covariate_vars$clinical_cutoff <- ifelse(covariate_vars$EDEQ_score >= 13, "clinical", "non-clinical")
#######################
##BSQR
#######################
covariate_vars$BSQR_1 <- recode(covariate_vars$BSQR_1, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_2 <- recode(covariate_vars$BSQR_2, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_3 <- recode(covariate_vars$BSQR_3, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_4 <- recode(covariate_vars$BSQR_4, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_5 <- recode(covariate_vars$BSQR_5, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_6 <- recode(covariate_vars$BSQR_6, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_7 <- recode(covariate_vars$BSQR_7, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_8 <- recode(covariate_vars$BSQR_8, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_9 <- recode(covariate_vars$BSQR_9, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_10 <- recode(covariate_vars$BSQR_10, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_11 <- recode(covariate_vars$BSQR_11, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_12 <- recode(covariate_vars$BSQR_12, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_13 <- recode(covariate_vars$BSQR_13, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)
covariate_vars$BSQR_14 <- recode(covariate_vars$BSQR_14, "0" = 1, "1" = 2, "2" = 3, "3" = 4, "4" = 5, "5" = 6)

covariate_vars$BSQR_score <- covariate_vars$BSQR_1+covariate_vars$BSQR_2+covariate_vars$BSQR_3+covariate_vars$BSQR_4+covariate_vars$BSQR_5+covariate_vars$BSQR_6+covariate_vars$BSQR_7+covariate_vars$BSQR_8+covariate_vars$BSQR_9+covariate_vars$BSQR_10+covariate_vars$BSQR_11+covariate_vars$BSQR_12+covariate_vars$BSQR_13+covariate_vars$BSQR_14   
covariate_vars$classification <- ifelse(covariate_vars$BSQR_score <= 45, "no concern with body",
                              ifelse(covariate_vars$BSQR_score <= 56, "mild concern with body",
                                     ifelse(covariate_vars$BSQR_score <= 68, "moderate concern with body", "marked concern with body")))
##### determine keepers ####
#create "keep" column and a follow instructions column
covariate_vars$keep <- "NA"
covariate_vars$followed_instr <- "NA"
covariate_vars$mental_health <- (covariate_vars$mental_check)
covariate_vars$followed_debrief <- sapply(covariate_vars$debrief, function(x) if(x == "agree") "OK" else if (x == "decline") "EXCLUDE")
# attention <- covariate_vars$catch1, covariate_vars$catch2, covariate_vars$catch3
covariate_vars$catch1 <- sapply(covariate_vars$catch1, function(x) if(x == 2) "PASS" else if (x != 2) "FAIL")
covariate_vars$catch2 <- sapply(covariate_vars$catch2, function(x) if(x == 1) "PASS" else if (x != 1) "FAIL")
covariate_vars$catch3 <- sapply(covariate_vars$catch3, function(x) if(x == 0) "PASS" else if (x != 0) "FAIL")

#Criteria to be a keeper
covariate_vars$keep="KEEP"
for (i in 1:length(covariate_vars$keep)){
  if (covariate_vars$catch1[i] == "FAIL"&covariate_vars$catch2[i] == "FAIL"){
    covariate_vars$keep[i] = "EXCLUDE"}
  else if (covariate_vars$catch1[i] == "FAIL"&covariate_vars$catch3[i] == "FAIL"){
    covariate_vars$keep[i] = "EXCLUDE"}
  else if (covariate_vars$catch2[i] == "FAIL"&covariate_vars$catch3[i] == "FAIL"){
    covariate_vars$keep[i] = "EXCLUDE"}
  else if (covariate_vars$followed_instr[i] == "EXCLUDE"){
    covariate_vars$keep[i] = "EXCLUDE"}
}
########## AGE ############# Column 7
covariate_vars[230, 7] = 22 # 230 is 22
covariate_vars[90, 7] = 21
covariate_vars[112, 7] = 21# 90 and 112 are 21
covariate_vars[109, 7] = 20
covariate_vars[171, 7] = 20# 109 and 171 are 20
covariate_vars[78, 7] = 18
covariate_vars[83, 7] = 18# 78 and 83 are 18
############################
########## WEIGHT ############# Column 10

covariate_vars[120, 10] = 126 # 120 weighs 126
covariate_vars[25, 10] = 209.4 # 25 weighs 209.4
covariate_vars[411, 10] = 98 # 411 weighs 98
covariate_vars[231, 10] = 92.6 # 231, 42 kg, 92.6
covariate_vars[128, 10] = 94.8 # 128, 43 kg, 94.8
covariate_vars[114, 10] = 110.2 # 114, 50 kg, 110.2
covariate_vars[124, 10] = 110.2 # 124, 50 kg, 110.2
covariate_vars[75, 10] = 132.3 # 75, 60 kg, 132.3
covariate_vars[169, 10] = 143.3 # 169, 65 kg, 143.3
covariate_vars[4, 10] = 143.3 # 4, 65 kg, 143.3
covariate_vars[110, 10] = 149.9 # 110, 68 kg, 149.9
covariate_vars[424, 10] = 182.9 # 424, 83 kg, 182.9
covariate_vars[417, 10] = 189.4 # 417, 85 kg, 189.4
covariate_vars[331, 10] = 148 # 331, weighs 148
covariate_vars[251, 10] = 141 # 251, weighs 141
covariate_vars[149, 10] = 130 # 149, weighs 130
covariate_vars[109, 10] = 121 # 109, 121
covariate_vars[67, 10] = 120 # 67, 120
covariate_vars[57, 10] = 115 # 57, 115
covariate_vars[107, 10] = 114 # 107, 114
covariate_vars[421, 10] = "NA" # 421, NA, they entered zero
covariate_vars[253, 10] = 141 
covariate_vars[83, 10] = 130.07 ## correcting a comma
covariate_vars[134, 10] = 253.5 ## correcting a comma
covariate_vars[27, 10] = 209.44 ## correcting 95 kg to 209.44
####################################
########## HEIGHT ############# Column 11
covariate_vars$height <- revalue(covariate_vars$height, c("5'1"="5.1"))
covariate_vars$height <- revalue(covariate_vars$height, c("5,7"="5.7"))
covariate_vars$height <- revalue(covariate_vars$height, c("5,6"="5.6"))
covariate_vars$height <- revalue(covariate_vars$height, c("5,5"="5.5"))
covariate_vars$height <- revalue(covariate_vars$height, c("5,4"="5.4"))
covariate_vars$height <- revalue(covariate_vars$height, c("25.59"="5.7"))
covariate_vars$height <- revalue(covariate_vars$height, c("4.93"="4.11"))
  covariate_vars$height <- revalue(covariate_vars$height, c("5.6."="5.6"))
    covariate_vars$height <- revalue(covariate_vars$height, c("5"="5.0"))
      covariate_vars$height <- revalue(covariate_vars$height, c("5."="5.0"))
        covariate_vars$height <- revalue(covariate_vars$height, c("5'2"="5.2"))
          covariate_vars$height <- revalue(covariate_vars$height, c("5.2."="5.2"))
            covariate_vars$height <- revalue(covariate_vars$height, c("5.5."="5.5"))
              covariate_vars$height <- revalue(covariate_vars$height, c("5.51"="5.5"))
                covariate_vars$height <- revalue(covariate_vars$height, c("5.4."="5.4"))
                  covariate_vars$height <- revalue(covariate_vars$height, c("5.3."="5.3"))
                    covariate_vars$height <- revalue(covariate_vars$height, c("6"="6.0"))
                      covariate_vars$height <- revalue(covariate_vars$height, c("5.18foot"="5.18"))
                    covariate_vars$height <- revalue(covariate_vars$height, c("5foot6"="5.6"))
                  covariate_vars$height <- revalue(covariate_vars$height, c("5foot6inches"="5.6"))
                covariate_vars$height <- revalue(covariate_vars$height, c("5foot8inches"="5.8"))#5.18foot	#5foot6 #5foot6inches #5foot8inches 
covariate_vars$height <- revalue(covariate_vars$height, c("2.3"="7.6"))  #seems improbable, but who knows!                  #2.3
covariate_vars$height <- revalue(covariate_vars$height, c("1m75"="5.9"))                    #1m75
covariate_vars$height <- revalue(covariate_vars$height, c("176cm"="5.9"))                   #176cm
covariate_vars$height <- revalue(covariate_vars$height, c("1.67"="5.5"))                   #1.67
covariate_vars$height <- revalue(covariate_vars$height, c("1.53m"="5.0"))                    #1.53m
covariate_vars$height <- revalue(covariate_vars$height, c("5.6meters"="5.6")) #5.6meters
covariate_vars$height <- revalue(covariate_vars$height, c("5.9."="5.9"))
covariate_vars$height <- revalue(covariate_vars$height, c("5.8."="5.8"))
covariate_vars$height <- revalue(covariate_vars$height, c("5.7."="5.7"))
covariate_vars$height <- revalue(covariate_vars$height, c("5'5"="5.5"))
#Split onto feet and inches
covariate_vars <- tidyr::separate(covariate_vars, height, into = c("feet", "inches"))
covariate_vars$inches <- as.numeric(covariate_vars$inches)
covariate_vars$feet <- as.numeric(covariate_vars$feet)
covariate_vars$weight <- as.numeric(covariate_vars$weight)
## if inches are more than 12, divide by 100
covariate_vars$inches <- replace(covariate_vars$inches,covariate_vars$inches>=12,covariate_vars$inches/100)
####################################
# ########## BMI CALCULATIONS ############
covariate_vars$height.in <- covariate_vars$feet*12 + covariate_vars$inches
covariate_vars$height.cm <- covariate_vars$height.in * 2.54
covariate_vars$wkg <- covariate_vars$weight * 0.453592
covariate_vars$bmi <- ((covariate_vars$wkg/covariate_vars$height.cm/covariate_vars$height.cm)*10000) # equals kg/meterssquared
covariate_vars$bmicategory <- ifelse(covariate_vars$bmi >= 41.76, "obese class III",
                            ifelse(covariate_vars$bmi >= 36.58, "obese class II",
                                   ifelse(covariate_vars$bmi >= 31.84, "obese class I",
                                          ifelse(covariate_vars$bmi >= 25.37, "overweight", 
                                                 ifelse(covariate_vars$bmi >= 18.50, "nomal", 
                                                        ifelse(covariate_vars$bmi >=17.08, "mild underweight", 
                                                               ifelse(covariate_vars$bmi >=16.12, "moderate underweight", "severe underweight")))))))

####################################
####### PARTICIPANT BMI RATINGS ####
covariate_vars$ratingchange <- "None" 
covariate_vars$ratingchange <- ifelse(covariate_vars$s1selfjudge == 65 & covariate_vars$s2selfjudge == 65, 0,
                                    ifelse(covariate_vars$s1selfjudge == 76 & covariate_vars$s2selfjudge == 65, -1, 1))
covariate_vars$s1selfjudge_meaning <- ifelse(covariate_vars$s1selfjudge == 65, "not overweight",
                                           ifelse(covariate_vars$s1selfjudge == 76, "overweight", "rating needs to be checked"))
covariate_vars$s2selfjudge_meaning <- ifelse(covariate_vars$s2selfjudge == 65, "not overweight",
                                           ifelse(covariate_vars$s2selfjudge == 76, "overweight", "rating needs to be checked"))

##covariate_vars[covariate_vars == "65"] <- "not overweight"
##covariate_vars[covariate_vars == "76"] <- "overweight"

covariate_vars$picbmi <- as.character(covariate_vars$chosenbody)

{
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H010.jpg"] <- 21.55
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H020.jpg"] <- 23.35
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H030.jpg"] <- 25.37
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H040.jpg"] <- 27.37
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H050.jpg"] <- 29.57
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H060.jpg"] <- 31.84
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H070.jpg"] <- 34.13
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H080.jpg"] <- 36.58
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H100.jpg"] <- 41.76
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H110.jpg"] <- 44.55
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/N000.jpg"] <- 19.79
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T010.jpg"] <- 19.61
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T020.jpg"] <- 19.30
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T030.jpg"] <- 19.10
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T040.jpg"] <- 18.77
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T050.jpg"] <- 18.50
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T060.jpg"] <- 18.26
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T070.jpg"] <- 18.01
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T080.jpg"] <- 17.77
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T090.jpg"] <- 17.56
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T100.jpg"] <- 17.28
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T130.jpg"] <- 16.64
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T120.jpg"] <- 16.81
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T140.jpg"] <- 16.40
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T170.jpg"] <- 15.67
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T210.jpg"] <- 14.86
  ##### Some missing ones added down here #####
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T110.jpg"] <- 17.08
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T150.jpg"] <- 16.12
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T160.jpg"] <- 15.74
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T180.jpg"] <- 15.49
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T190.jpg"] <- 15.24
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T220.jpg"] <- 14.65
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/T240.jpg"] <- 14.28
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H090.jpg"] <- 39.10
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H130.jpg"] <- 50.23
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H140.jpg"] <- 53.21
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H150.jpg"] <- 56.26
  covariate_vars$picbmi[covariate_vars$picbmi == "stim/H170.jpg"] <- 59.31
  
  #missing stim/H090.jpg, stim/H130.jpg, stim/H140.jpg, stim/H150.jpg, stim/H170.jpg, 	
  # stim/T110.jpg, stim/T150.jpg, stim/T160.jpg, stim/T180.jpg, stim/T190.jpg, stim/T220.jpg, stim/T240.jpg, 
}

covariate_vars$whobmi <- "NA"
covariate_vars$whobmi <- ifelse(covariate_vars$picbmi >= 41.76, "obese class III",
                              ifelse(covariate_vars$picbmi >= 36.58, "obese class II",
                                     ifelse(covariate_vars$picbmi >= 31.84, "obese class I",
                                            ifelse(covariate_vars$picbmi >= 25.37, "overweight", 
                                                   ifelse(covariate_vars$picbmi >= 18.50, "nomal", 
                                                          ifelse(covariate_vars$picbmi >=17.08, "mild underweight", 
                                                                 ifelse(covariate_vars$picbmi >=16.12, "moderate underweight", "severe underweight")))))))
###############################
######## CALCULATED BMI #########
covariate_vars$calbmi <- "NA" # also follows WHO criteria
covariate_vars$calbmi <- ifelse(covariate_vars$bmi >= 41.76, "obese class III",
                                ifelse(covariate_vars$bmi >= 36.58, "obese class II",
                                       ifelse(covariate_vars$bmi >= 31.84, "obese class I",
                                              ifelse(covariate_vars$bmi >= 25.37, "overweight", 
                                                     ifelse(covariate_vars$bmi >= 18.50, "nomal", 
                                                            ifelse(covariate_vars$bmi >=17.08, "mild underweight", 
                                                                   ifelse(covariate_vars$bmi >=16.12, "moderate underweight", "severe underweight")))))))
###############################
covariate_vars$picbmi <- as.numeric(covariate_vars$picbmi)
covariate_vars$bmi <- as.numeric(covariate_vars$bmi)
# Discrepancy between calculated BMI and participant-reported BMI
covariate_vars$ratingdiscrepancy <- covariate_vars$picbmi - covariate_vars$bmi

}

############ SCREENTIME HOURS AND MINUTES #############
screentime <- covariate_vars[, c("subject", "TV01", "DEV01", "LAP01", "PHO01", "TAB01", "TV02", "DEV02", "LAP02", "PHO02", "TAB02",
                                 "TV03", "DEV03", "LAP03", "PHO03", "TAB03", "WEDSEC", "WNISEC", "WKNSEC")]
# sweepy sweepy cleanup time
screentime[] <- lapply(screentime, as.character)
screentime[screentime == "0"] <- "0:00"
screentime[screentime == "00;00"] <- "0:00" 	
screentime[screentime == "0.3"] <- "0:30" # 0.3
#45minutes, 1-2hours, 6hours
screentime[screentime == "0.5"] <- "0:30"
screentime[screentime == "00.45"] <- "0:45" # 00.45
screentime[screentime == "45minutes"] <- "0:45" # 00.45
screentime[screentime == "1"] <- "1:00"
screentime[screentime == "1.5"] <- "1:30"
screentime[screentime == "001:30"] <- "1:30"
screentime[screentime == "1-2hours"] <- "1:30"
screentime[screentime == "2"] <- "2:00"
screentime[screentime == "2:0"] <- "2:00" #	2:0
screentime[screentime == "3"] <- "3:00"
screentime[screentime == "4"] <- "4:00"
screentime[screentime == "5"] <- "5:00"
screentime[screentime == "6"] <- "6:00"
screentime[screentime == "7"] <- "7:00"
screentime[screentime == "8"] <- "8:00"
screentime[screentime == "Tenminutes"] <- "0:10"
screentime[screentime == "Fifteenminutes"] <- "0:15"
screentime[screentime == "FifteenMinutes"] <- "0:15"
screentime[screentime == "1hour"] <- "1:00"
screentime[screentime == "twohours"] <- "2:00"
screentime[screentime == "2hours"] <- "2:00"
screentime[screentime == "two-threehours"] <- "2:30"
screentime[screentime == "threehours"] <- "2:00"
screentime[screentime == "3hours"] <- "3:00"
screentime[screentime == "4hours"] <- "4:00"
screentime[screentime == "5hours"] <- "5:00"
screentime[screentime == "5.5hours"] <- "5:30"
screentime[screentime == "6hours"] <- "6:00"
screentime[screentime == "10"] <- "10:00"
screentime[screentime == "12"] <- "12:00"
screentime[screentime == "15"] <- "15:00"
screentime[screentime == "16"] <- "16:00"
screentime[screentime == "20:00"] <- "4:00"
screentime[screentime == "22"] <- "11:00"
screentime[screentime == "24"] <- "12:00"
screentime[screentime == "12h"] <- "12:00"
screentime[screentime == "3h"] <- "12:00"
screentime[screentime == "28"] <- "5:36"
screentime[screentime == "30"] <- "6:00"
screentime[screentime == "19"] <- "3:48"
screentime[screentime == "21"] <- "4:12"
screentime[screentime == "42"] <- "8:24"
screentime[screentime == "60"] <- "12:00"
screentime[screentime == "35:00:00"] <- "7:00"
screentime[screentime == "70:00:00"] <- "10:00"
screentime[screentime == "1.15"] <- "1:15"
screentime[screentime == "00;00"] <- "0:00"
screentime[screentime == "2;00"] <- "2:00"
screentime[screentime == "40mins"] <- "0:40"
screentime[screentime == "10mins"] <- "0:10"
screentime[screentime == "47:00:00"] <- "9:24"
screentime[screentime == "84"] <- "16:48"
screentime[screentime == "25"] <- "5:00"
screentime[screentime == "30"] <- "6:00"
screentime[screentime == "35"] <- "7:00"
screentime[screentime == ":30"] <- "0:30"
screentime[screentime == "70"] <- "10:00"
screentime[screentime == "1;15"] <- "1:15"
screentime[screentime == "1.15"] <- "1:15"
screentime[screentime == "9hours"] <- "9:00"
screentime[screentime == "12hours(zoom)"] <- "12:00"
screentime[screentime == "0min"] <- "0:00"
screentime[screentime == "30minutes"] <- "0:30"
screentime[screentime == "0minutes"] <- "0:00"
screentime[screentime == "12hours"] <- "12:00"
screentime[screentime == "NA"] <- "0:00"
screentime[screentime == "N/A"] <- "0:00"
screentime[screentime == "6H"] <- "6:00"
screentime[screentime == "4H"] <- "4:00"
screentime[screentime == "15H"] <- "15:00"
screentime[screentime == "0H"] <- "0:00"
screentime[screentime == "0:0"] <- "0:00"
screentime[screentime == "0.2"] <- "0:20"
screentime[screentime == "8:0"] <- "8:00"
screentime[screentime == "2:0"] <- "2:00"
screentime[screentime == "50:00"] <- "5:00"
screentime[screentime == "5.00"] <- "5:00"
screentime[screentime == "45"] <- "45:00"
screentime[screentime == "40"] <- "40:00"
screentime[screentime == "20"] <- "20:00"
screentime[screentime == "9"] <- "9:00"
screentime[screentime == "02300"] <- "23:00" #02300
screentime[screentime == "3;15"] <- "3:15"
screentime[screentime == "0.083333333"] <- "8:33" #0.083333333
screentime[screentime == "n/a"] <- "0:00"
screentime[screentime == "0.00"] <- "0:00"
screentime[screentime == "0.20"] <- "0:20"
screentime[screentime == "1.00"] <- "1:00"
screentime[screentime == "2.00"] <- "2:00"
screentime[screentime == "200:00"] <- "3:30" #00
screentime[screentime == "00"] <- "0:00"
screentime[screentime == "192hours"] <- "3:10"
screentime[screentime == "360hours"] <- "6:00"
screentime[screentime == "108hours"] <- "1:50"
screentime[screentime == "1704:00:00"] <- "14:00"
screentime[screentime == "1176:00:00"] <- "18:00"
screentime[screentime == "528:00:00"] <- "8:00"
screentime[screentime == "02;00"] <- "02:00"
screentime[screentime == "04;00"] <- "04:00"
screentime[screentime == "06;00"] <- "06:00"
screentime[screentime == "10;00"] <- "10:00"
screentime[screentime == "0;00"] <- "0:00"
screentime[screentime == "4.00"] <- "4:00"
screentime[screentime == "0.30"] <- "0:30"

write.csv(screentime,"~/Desktop/body_data/screens.csv", "row.names" = FALSE)
screens_saved_hhmm <- read_csv("~/Desktop/body_data/screens_saved_hhmm.csv", 
                                    col_types = cols(TV01 = col_time(format = "%H:%M"), 
                                                               DEV01 = col_time(format = "%H:%M"), 
                                                               LAP01 = col_time(format = "%H:%M"), 
                                                               PHO01 = col_time(format = "%H:%M"), 
                                                               TAB01 = col_time(format = "%H:%M"), 
                                                               TV02 = col_time(format = "%H:%M"), 
                                                               DEV02 = col_time(format = "%H:%M"), 
                                                               LAP02 = col_time(format = "%H:%M"), 
                                                               PHO02 = col_time(format = "%H:%M"), 
                                                               TAB02 = col_time(format = "%H:%M"), 
                                                               TV03 = col_time(format = "%H:%M"), 
                                                               DEV03 = col_time(format = "%H:%M"), 
                                                               LAP03 = col_time(format = "%H:%M"), 
                                                               PHO03 = col_time(format = "%H:%M"), 
                                                               TAB03 = col_time(format = "%H:%M"), 
                                                               WEDSEC = col_time(format = "%H:%M"), 
                                                               WNISEC = col_time(format = "%H:%M"), 
                                                               WKNSEC = col_time(format = "%H:%M")))
# Time for screen time!
library(lubridate)
library(stringi)
library(purrr)

sct <- screens_saved_hhmm
sct$weekdaysc <- 0
#does this part in seconds for some dumb reason, so going to fix by dividing by 60
sct$weekdaysc <- ((sct$TV01 + sct$DEV01 + sct$LAP01 + sct$PHO01 + sct$TAB01)/60) #nice!
sct$nightsc <- ((sct$TV02 + sct$DEV02 + sct$LAP02 + sct$PHO02 + sct$TAB02)/60) #nice!
sct$weekendsc <- ((sct$TV03 + sct$DEV03 + sct$LAP03 + sct$PHO03 + sct$TAB03)/60) #nice!
sct$backgroundsc <- ((sct$WEDSEC + sct$WNISEC + sct$WKNSEC)/60) #nice!
sct$primarysc <- sct$weekdaysc + sct$nightsc + sct$weekendsc
sct$totalsc <- sct$primarysc + sct$backgroundsc
#maybe minutes is better than hours? Hours might be easier to read.

demographics <- merge(covariate_vars, sct, by = "subject")
# Let's keep just the essentials
demo <- demographics[, c("subject", "condition", "gender", "age", "height.cm", "wkg", "ethnicity", "marital", "natlang", "olang", "mental_check", "mental", "mentdrug", "mentpos",
                         "soc_1", "soc_2", "soc_3", "soc_4", "soc_5", "sesparent", "sesstudent", "sesladder", "sescurrency", "educ_l", "educ_c", "speaks_english",
                         "educ_hs", "educ_ce", "s1self", "s2self", "chosenbody", "ratingchange", "s1selfjudge_meaning", "s2selfjudge_meaning", "catch1", "catch2", "catch3", "prolID", "ngs_score", "global.sev.index", 
                         "somatic", "anxiety", "depression", "EDEQ_score", "clinical_cutoff", "BSQR_score", "classification", "picbmi", "whobmi", "calbmi", "ratingdiscrepancy",
                         "TV01.y", "DEV01.y", "LAP01.y", "PHO01.y", "TAB01.y", "TV02.y", "DEV02.y", "LAP02.y", "PHO02.y", "TAB02.y",
                                 "TV03.y", "DEV03.y", "LAP03.y", "PHO03.y", "TAB03.y", "WEDSEC.y", "WNISEC.y", "WKNSEC.y", "weekdaysc", "nightsc",
                         "weekendsc", "backgroundsc", "primarysc", "totalsc")]

#######################
##SOC questionnaire: Objective Social Media Use (Front. Psychol., 28 April 2020 | https://doi.org/10.3389/fpsyg.2020.00701)
#######################
demo$soc_1 <- recode(demo$soc_1, "0" = 'Less than once a week', "1" = 'Less than once a day', "2" = 'Two to three times a day', "3" = 'Four to five times a day', "4" = 'At least six times a day')
demo$soc_2 <- recode(demo$soc_2, "0" = 'Less than 30 minutes', "1" = 'Between 31 minutes and 2 hours', "2" = 'Between 2 and 6 hours', "3" = 'Between 6 and 12 hours', "4" = '12 hours or more')
demo$soc_3 <- recode(demo$soc_3, "0" = 'Less than 30 minutes', "1" = 'Between 31 minutes to 60 minutes', "2" = 'Between 1 and 2 hours', "3" = 'Between 2 and 4 hours', "4" = '5 hours or more')
demo$soc_4 <- recode(demo$soc_4, "0" = 'Less than 3 years', "1" = 'Between 4 and 5 years', "2" = 'Between 6 and 7 years', "3" = 'Between 8 and 9 years', "4" = '10 or more years')
demo$soc_5 <- recode(demo$soc_5, "0" = 'Less than 50 friends', "1" = '51 to 100 friends', "2" = '101 to 150 friends', "3" = '151 to 200 friends', "4" = 'More than 200 friends')
#######################
##SES
#######################
#ses parent (parental income)
demo$sesparent <- recode(demo$sesparent, "0" = '< 100$', "1" = '101-200$', "2" = '201-300$', "3" = '301-400$', "4" = '401-500$', "5" = '501-600$', "6" = '601-700$', "7" = '701-800$', "8" = '801-900$', "9" = '901$ +')
#ses student (student income)
demo$sesstudent <- recode(demo$sesstudent, "0" = '< 100$', "1" = '101-200$', "2" = '201-300$', "3" = '301-400$', "4" = '401-500$', "5" = '501-600$', "6" = '601-700$', "7" = '701-800$', "8" = '801-900$', "9" = '901$ +')
#ses ladder (subjective ses)
demo$sesladder <- recode(demo$sesladder, "0" = '1', "1" = '2', "2" = '3', "3" = '4', "4" = '5', "5" = '6', "6" = '7', "7" = '8', "8" = '9', "9" = '10')
#ses currency (native currency)
demo$sescurrency <- recode(demo$sescurrency, "0" = 'CAD', "1" = 'USD', "2" = 'GBP', "3" = 'AUS', "4" = 'EURO', "5" = 'OTHER')
#educcl
demo$educ_l <- recode(demo$educ_l, "Undergraduatedegree" = 'Undergraduate Degree', "4" = 'Undergraduate Degree', "Professionaldegree(i.e.,LawSchool,MedicalSchool,Dentistry)" = 'Professional Degree', "6" = 'Professional Degree', "JuniorHighSchool" = 'Junior High School', "1" = 'Junior High School', "HighSchool" = 'High School', "2" = 'High School', "Graduatedegree" = 'Graduate Degree', "5" = 'Graduate Degree', "CEGEP,non-universitycollege,tradeschoolorequivalent" = 'CEGEP', "3" = 'CEGEP', "0" = 'Primary School')
#educcollege
demo$educ_c <- recode(demo$educ_c, "No,currentlynotinschool" = 'Not in school', "Yes,Undergraduatestudies" = 'Undergrad student', "Yes,Graduatestudies" = 'Grad student', "0" = 'Pre-university student', "1" = 'Undergrad student', "2" = 'Grad student', "3" = 'Not in school', "Yes,butnotatauniversity" = 'Pre-university student')
#educhs
demo$educ_hs <- recode(demo$educ_hs, "0" = '90-100 (A+)', "1" = '85-89 (A)', "2" = '80-84 (A-)', "3" = '77-79 (B+)', "4" = '73-76 (B)', "5" = '70-72 (B-)', "6" = '67-70 (C+)', "7" = '63-66 (C)', "8" = '60-62 (C-)', "9" = '57-59 (D+)', "10" = '53-56 (D)', "11" = '50-52 (D-)', "12" = '< 50 (F)', "13" = 'I did not complete High School')
#educcollege grade
demo$educ_ce <- recode(demo$educ_ce, "0" = '90-100 (A+)', "1" = '85-89 (A)', "2" = '80-84 (A-)', "3" = '77-79 (B+)', "4" = '73-76 (B)', "5" = '70-72 (B-)', "6" = '67-70 (C+)', "7" = '63-66 (C)', "8" = '60-62 (C-)', "9" = '57-59 (D+)', "10" = '53-56 (D)', "11" = '50-52 (D-)', "12" = '< 50 (F)', "13" = 'N/A')
demo$hslettergrade <- recode(demo$educ_hs, "90-100 (A+)" = 'A+', "85-89 (A)" = 'A', "80-84 (A-)" = 'A-', "77-79 (B+)" = 'B+', "73-76 (B)" = 'B', "70-72 (B-)" = 'B-', "67-70 (C+)" = 'C+', "63-66 (C)" = 'C', "60-62 (C-)" = 'C', "57-59 (D+)" = 'D+', "53-56 (D)" = 'D', "50-52 (D-)" = 'D', "< 50 (F)" = 'F', "I did not complete High School" = 'N/A')
demo$celettergrade <- recode(demo$educ_ce, "90-100 (A+)" = 'A+', "85-89 (A)" = 'A', "80-84 (A-)" = 'A-', "77-79 (B+)" = 'B+', "73-76 (B)" = 'B', "70-72 (B-)" = 'B-', "67-70 (C+)" = 'C+', "63-66 (C)" = 'C', "60-62 (C-)" = 'C', "57-59 (D+)" = 'D+', "53-56 (D)" = 'D', "50-52 (D-)" = 'D', "< 50 (F)" = 'F', "I did not complete High School" = 'N/A')

full_demographics <- demo

#######
# KIRBY CALCULATIONS
#######
kirby <- demographics[, c("subject", "kirby01", "kirby02", "kirby03", "kirby04", "kirby05", "kirby06", "kirby07", "kirby08",  
                          "kirby09", "kirby10", "kirby11", "kirby12", "kirby13", "kirby14", "kirby15", "kirby16", "kirby17", 
                          "kirby18", "kirby19", "kirby20", "kirby21")]


write.csv(kirby,"~/Desktop/body_data/kirby.csv", 'row.names' = FALSE)
kirbyMCQ <- read_csv("kirbyMCQ.csv")
demographics3 <- full_join(full_demographics, kirbyMCQ, by = 'subject', copy = FALSE, suffix = c("", ""))

#join prolific data

demographics4 <- full_join(demographics3, prolific_demographics, by = 'subject', copy = FALSE, suffix = c("", ".prol"))

#drop rows after 463
DEMOG <- demographics4[-c(463:554), ]

## DEMOG <- DEMOG[, -c("kirby01", "kirby02", "kirby03", "kirby04", "kirby05", "kirby06", "kirby07", "kirby08",  
##                          "kirby09", "kirby10", "kirby11", "kirby12", "kirby13", "kirby14", "kirby15", "kirby16", "kirby17", 
 ##   "kirby18", "kirby19", "kirby20", "kirby21", "prolID.prol", "condition.prol", "weight", "height", "age.y"), ]

DEMOG <- DEMOG[-c(78:98, 123:127)] # get rid of comma for columns 
write.csv(DEMOG,"~/Desktop/body_data/covariates.csv", 'row.names' = FALSE)


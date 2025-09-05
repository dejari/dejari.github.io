libname ENCTEST "/nfscontent/_encrypt/subdir1/subdir2/subdir3";

/* ENCR : /export/canada/homes/_encrypt/  CAS*/
/* ENCR : /nfscontent/_encrypt */

libname test "/nfscontent/_encrypt/subdir1/subdir2";
 
data test.baseball;
    set sashelp.baseball;
run;

proc cas;
   table.dropCaslib /
      caslib="myCas"
      quiet=true;   /* optional: suppress error if caslib doesn't exist */
quit;
 
 caslib myCas datasource=(srctype="path")
  path="/export/canada/homes/_encrypt/subdir1/subdir2/" subdirs;
 
  caslib _all_ assign;
  proc casutil incaslib=myCas;
    list files;
  quit;
Name: 
ID: 

### Fuzz Monitor
```
 american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 13 min, 38 sec      │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 6 min, 3 sec        │  total paths : 10     │
│ last uniq crash : 0 days, 0 hrs, 11 min, 14 sec      │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 6 min, 8 sec        │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.66 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (10.00%)             │
│ stage execs : 349/1868 (18.68%)     │  new edges on : 4 (40.00%)             │
│ total execs : 1201                  │ total crashes : 49 (1 unique)          │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 253 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 10         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 9          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/39, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu:527%] │
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==31407==ERROR: AddressSanitizer: stack-overflow on address 0x7ffff852c728 (pc 0x5584d6647028 bp 0x7ffff8d2ac10 sp 0x7ffff852c728 T0)
    #0 0x5584d6647027 in main /home/pleaseppu/Desktop/AFL/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7fdac0693082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5584d6647b0d in _start (/home/pleaseppu/Desktop/AFL/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2b0d)

SUMMARY: AddressSanitizer: stack-overflow /home/pleaseppu/Desktop/AFL/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==31407==ABORTING
```

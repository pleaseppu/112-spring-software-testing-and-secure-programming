# Answer

Name: 朱健維
ID: 511558004

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |          |      |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

void heap_out_of_bounds() {
    int *ptr = (int *)malloc(3 * sizeof(int));
    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return;
    }

    ptr[3] = 10; // Heap out-of-bounds write

    free(ptr);
}

int main() {
    heap_out_of_bounds();

    return 0;
}
```
#### Valgrind Report
```
==4872== Memcheck, a memory error detector
==4872== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==4872== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==4872== Command: ./test2
==4872== 
==4872== Invalid write of size 4
==4872==    at 0x10918F: heap_out_of_bounds (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2)
==4872==    by 0x1091B0: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2)
==4872==  Address 0x4a5204c is 0 bytes after a block of size 12 alloc'd
==4872==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==4872==    by 0x10916A: heap_out_of_bounds (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2)
==4872==    by 0x1091B0: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2)
==4872== 
==4872== 
==4872== HEAP SUMMARY:
==4872==     in use at exit: 0 bytes in 0 blocks
==4872==   total heap usage: 1 allocs, 1 frees, 12 bytes allocated
==4872== 
==4872== All heap blocks were freed -- no leaks are possible
==4872== 
==4872== For lists of detected and suppressed errors, rerun with: -s
==4872== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==4975==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001c at pc 0x559497268209 bp 0x7ffcfe73eec0 sp 0x7ffcfe73eeb8
WRITE of size 4 at 0x60200000001c thread T0
    #0 0x559497268208 in heap_out_of_bounds /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2.c:11
    #1 0x559497268216 in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2.c:17
    #2 0x7f4e8ae456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f4e8ae45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x5594972680e0 in _start (/home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test3+0x10e0)

0x60200000001c is located 0 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7f4e8b0b89cf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5594972681b6 in heap_out_of_bounds /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test2.c:11 in heap_out_of_bounds
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00[04]fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==4975==ABORTING

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() { int arr[8];

// Stack out-of-bounds
arr[8] = 57; 

printf("Value: %d\n", arr[0]);
return 0;
}
```
#### Valgrind Report
```
==5409== Memcheck, a memory error detector
==5409== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==5409== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==5409== Command: ./test
==5409== 
==5409== Conditional jump or move depends on uninitialised value(s)
==5409==    at 0x48C9528: __printf_buffer (vfprintf-process-arg.c:58)
==5409==    by 0x48C9E00: __vfprintf_internal (vfprintf-internal.c:1459)
==5409==    by 0x48BFC4A: printf (printf.c:33)
==5409==    by 0x109160: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5409== 
==5409== Use of uninitialised value of size 8
==5409==    at 0x48BEEFB: _itoa_word (_itoa.c:177)
==5409==    by 0x48C8671: __printf_buffer (vfprintf-process-arg.c:155)
==5409==    by 0x48C9E00: __vfprintf_internal (vfprintf-internal.c:1459)
==5409==    by 0x48BFC4A: printf (printf.c:33)
==5409==    by 0x109160: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5409== 
==5409== Conditional jump or move depends on uninitialised value(s)
==5409==    at 0x48BEF0C: _itoa_word (_itoa.c:177)
==5409==    by 0x48C8671: __printf_buffer (vfprintf-process-arg.c:155)
==5409==    by 0x48C9E00: __vfprintf_internal (vfprintf-internal.c:1459)
==5409==    by 0x48BFC4A: printf (printf.c:33)
==5409==    by 0x109160: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5409== 
==5409== Conditional jump or move depends on uninitialised value(s)
==5409==    at 0x48C86C3: __printf_buffer (vfprintf-process-arg.c:186)
==5409==    by 0x48C9E00: __vfprintf_internal (vfprintf-internal.c:1459)
==5409==    by 0x48BFC4A: printf (printf.c:33)
==5409==    by 0x109160: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5409== 
Value: 0
==5409== 
==5409== HEAP SUMMARY:
==5409==     in use at exit: 0 bytes in 0 blocks
==5409==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==5409== 
==5409== All heap blocks were freed -- no leaks are possible
==5409== 
==5409== Use --track-origins=yes to see where uninitialised values come from
==5409== For lists of detected and suppressed errors, rerun with: -s
==5409== ERROR SUMMARY: 4 errors from 4 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==5436==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fff4eeb43d0 at pc 0x560b860f2298 bp 0x7fff4eeb4380 sp 0x7fff4eeb4378
WRITE of size 4 at 0x7fff4eeb43d0 thread T0
    #0 0x560b860f2297 in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:6
    #1 0x7f36466456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f3646645784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x560b860f20e0 in _start (/home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test3+0x10e0)

Address 0x7fff4eeb43d0 is located in stack of thread T0 at offset 64 in frame
    #0 0x560b860f21b8 in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:3

  This frame has 1 object(s):
    [32, 64) 'arr' (line 3) <== Memory access at offset 64 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:6 in main
Shadow bytes around the buggy address:
  0x100069dce820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce860: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100069dce870: 00 00 f1 f1 f1 f1 00 00 00 00[f3]f3 f3 f3 00 00
  0x100069dce880: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce890: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce8a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce8b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100069dce8c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==5436==ABORTING
```

### Global out-of-bounds
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Use-after-free
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Use-after-return
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

```
### Why


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
#include <stdio.h>
#include <stdlib.h>

int *my_array;

void init_array() {
    my_array = (int*)malloc(5 * sizeof(int));
    if (my_array == NULL) {
        printf("Memory allocation failed\n");
        exit(1);
    }
    for (int i = 0; i < 5; i++) {
        my_array[i] = i + 1;
    }
}

void access_array(int index) {
    printf("Accessing element at index: %d\n", index);
    printf("Value at index %d: %d\n", index, my_array[index]);
}

int main() {
    init_array();

    access_array(6);
    
    free(my_array);

    return 0;
}
```
#### Valgrind Report
```
==5649== Memcheck, a memory error detector
==5649== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==5649== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==5649== Command: ./test
==5649== 
Accessing element at index: 6
==5649== Invalid read of size 4
==5649==    at 0x109222: access_array (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5649==    by 0x109257: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5649==  Address 0x4a52058 is 4 bytes after a block of size 20 alloc'd
==5649==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5649==    by 0x10918A: init_array (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5649==    by 0x10924D: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5649== 
Value at index 6: 0
==5649== 
==5649== HEAP SUMMARY:
==5649==     in use at exit: 0 bytes in 0 blocks
==5649==   total heap usage: 2 allocs, 2 frees, 1,044 bytes allocated
==5649== 
==5649== All heap blocks were freed -- no leaks are possible
==5649== 
==5649== For lists of detected and suppressed errors, rerun with: -s
==5649== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==5665==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000058 at pc 0x558afd22a2c5 bp 0x7fff874ce400 sp 0x7fff874ce3f8
READ of size 4 at 0x603000000058 thread T0
    #0 0x558afd22a2c4 in access_array /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:24
    #1 0x558afd22a2dc in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:32
    #2 0x7f2c40e456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f2c40e45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x558afd22a120 in _start (/home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test3+0x1120)

0x603000000058 is located 4 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x7f2c410b89cf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x558afd22a1f6 in init_array /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:9

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:24 in access_array
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00 04[fa]fa fa fa fa
  0x0c067fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==5665==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));
    free(ptr);
    *ptr = 10; // Use-after-free
    return 0;
}
```
#### Valgrind Report
```
==5819== Memcheck, a memory error detector
==5819== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==5819== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==5819== Command: ./test
==5819== 
==5819== Invalid write of size 4
==5819==    at 0x10916F: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5819==  Address 0x4a52040 is 0 bytes inside a block of size 4 free'd
==5819==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5819==    by 0x10916A: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5819==  Block was alloc'd at
==5819==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5819==    by 0x10915A: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==5819== 
==5819== 
==5819== HEAP SUMMARY:
==5819==     in use at exit: 0 bytes in 0 blocks
==5819==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==5819== 
==5819== All heap blocks were freed -- no leaks are possible
==5819== 
==5819== For lists of detected and suppressed errors, rerun with: -s
==5819== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==5842==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x56209a80f1c3 bp 0x7ffd07049770 sp 0x7ffd07049768
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x56209a80f1c2 in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:6
    #1 0x7fea5aa456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fea5aa45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x56209a80f0b0 in _start (/home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test3+0x10b0)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7fea5acb76a8 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x56209a80f18e in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:5

previously allocated by thread T0 here:
    #0 0x7fea5acb89cf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x56209a80f183 in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:6 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==5842==ABORTING

```

### Use-after-return
#### Source code
```
#include <stdio.h>

int *return_pointer() {
    int value = 42;
    return &value;
}

int main() {
    int *ptr = return_pointer();
    printf("Value: %d\n", *ptr);
    printf("Value after return: %d\n", *ptr); 
    return 0;
}
```
#### Valgrind Report
```
==6195== Memcheck, a memory error detector
==6195== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==6195== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==6195== Command: ./test
==6195== 
==6195== Invalid read of size 4
==6195==    at 0x109165: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==6195==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==6195== 
==6195== 
==6195== Process terminating with default action of signal 11 (SIGSEGV)
==6195==  Access not within mapped region at address 0x0
==6195==    at 0x109165: main (in /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test)
==6195==  If you believe this happened as a result of a stack
==6195==  overflow in your program's main thread (unlikely but
==6195==  possible), you can try to increase the size of the
==6195==  main thread stack using the --main-stacksize= flag.
==6195==  The main thread stack size used in this run was 8388608.
==6195== 
==6195== HEAP SUMMARY:
==6195==     in use at exit: 0 bytes in 0 blocks
==6195==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==6195== 
==6195== All heap blocks were freed -- no leaks are possible
==6195== 
==6195== For lists of detected and suppressed errors, rerun with: -s
==6195== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
zsh: segmentation fault (core dumped)  valgrind ./test
```
### ASan Report
```
==6237==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5649850361b9 bp 0x000000000001 sp 0x7ffd8f364450 T0)
==6237==The signal is caused by a READ memory access.
==6237==Hint: address points to the zero page.
    #0 0x5649850361b9 in main /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:10
    #1 0x7f2e4b0456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f2e4b045784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5649850360c0 in _start (/home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test3+0x10c0)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/chu/桌面/112-spring-software-testing-and-secure-programming/lab5/test.c:10 in main
==6237==ABORTING

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

```
### Why


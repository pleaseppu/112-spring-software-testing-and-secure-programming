#include <stddef.h>
#include <stdint.h>   
void antiasan(unsigned long addr)
{
    char *shadow_mem = (char *)((addr >> 3) + 0x7fff8000);
    *shadow_mem = 0;
}

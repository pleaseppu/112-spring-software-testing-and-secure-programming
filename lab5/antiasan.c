void antiasan(unsigned long addr) {
    unsigned long shadow_addr = (addr >> 3) + 0x7fff8000;
    
    // 將地址轉換為指針，然後設置其值為 0
    *(char *)shadow_addr = 0;
}
